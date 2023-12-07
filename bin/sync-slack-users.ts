#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config
import { isDeepStrictEqual } from "util";

import {
  createSlackUsers,
  getAllSlackUsers,
  updateSlackUsers,
  type SlackUser as AirtableSlackUser,
} from "~/src/data/slack-user";
import {
  getAllWorkspaceUsers,
  getUserProfile,
  isRegularUser,
  type SlackUser,
} from "~/src/slack/user";

const { SLACK_SYNC_TOKEN: slackToken = "", DEBUG: debug = "" } = process.env;

/** ID of the custom Slack profile field that holds a public contact e-mail address */
const emailFieldId = "Xf01F0M3N546";

/**
 * Sync all Slack users to Airtable
 *
 * The script downloads a list of all users of the Česko.Digital Slack workspace
 * and inserts them into the Slack Users table in the Volunteer Management DB. Already
 * existing records (based on Slack User ID) are updated with new values, non-existing
 * users are inserted. No linking with other tables is done.
 */
async function main() {
  console.log(
    "Downloading all Slack users of the Česko.Digital workspace. This can take a while.",
  );
  const users = await getAllWorkspaceUsers(slackToken);
  const regularUsers = users.filter(isRegularUser);
  console.log(
    `Loaded ${regularUsers.length} regular users, ${users.length} users total.`,
  );

  // The user profiles supplied by the API call above do not contain
  // custom user profile fields that we need, so we have to query those
  // individually by another API call.
  console.log(`Downloading user profiles. This _will_ take a while.`);
  let i = 0;
  do {
    try {
      // Only extract custom profile fields, keeping the rest of the profile
      const profile = await getUserProfile(slackToken, users[i].id);
      users[i].profile.fields = profile.fields;
      i++;
      if (i % 100 === 0) {
        console.log(`Downloaded ${i} user profiles.`);
      }
    } catch (e) {
      // This is usually rate limiting, so let’s wait for a while before retrying
      console.error(e);
      console.info(
        `Will wait for a while and retry (current user index ${i}).`,
      );
      await sleep(120);
    }
  } while (i < users.length);

  console.log("Saving users to Airtable.");
  await upsertSlackUsers(regularUsers);
  console.log("Success! 🎉");
}

function convertUser(user: SlackUser): Omit<AirtableSlackUser, "id"> {
  return {
    slackId: user.id,
    name: user.real_name ?? user.name,
    email: user.profile.email,
    contactEmail: user.profile.fields[emailFieldId]?.value,
    slackAvatarUrl: user.profile.image_512,
    userProfileRelationId: undefined,
  };
}

async function upsertSlackUsers(slackUsers: SlackUser[]): Promise<void> {
  /** All users in the DB */
  const allExistingUsers = await getAllSlackUsers();
  console.log(`Downloaded ${allExistingUsers.length} existing users.`);

  /** A dictionary mapping Slack IDs to primary DB IDs */
  const mapSlackIDsToAirtableIDs = Object.fromEntries(
    allExistingUsers.map((user) => [user.slackId, user.id]),
  );

  /** A set of Slack IDs of users already stored in the DB */
  const slackIDsAlreadyInDB = new Set(
    allExistingUsers.map((user) => user.slackId),
  );

  /** An array of new users to create in the DB */
  const usersToInsert = slackUsers
    // Only those not in DB already
    .filter((user) => !slackIDsAlreadyInDB.has(user.id))
    // In the DB format
    .map(convertUser);

  console.log(`Creating ${usersToInsert.length} new users.`);
  if (debug && usersToInsert.length) {
    console.log(
      `Slack IDs of users being created: ${usersToInsert.map(
        (user) => user.slackId,
      )}`,
    );
  }
  await createSlackUsers(usersToInsert);

  /** Given a user in the DB format, is it different from the one already stored in the DB? */
  const hasUserChanged = (user: AirtableSlackUser) => {
    const previousUser = allExistingUsers.find((u) => u.id === user.id);
    return !previousUser || !isDeepStrictEqual(previousUser, user);
  };

  /** An array of previously existing users to update with new values */
  const usersToUpdate = slackUsers
    // Only those previously in the DB
    .filter((user) => slackIDsAlreadyInDB.has(user.id))
    // In the DB format
    .map(convertUser)
    // Include DB IDs so we can find the right record to update
    .map((user) => ({
      id: mapSlackIDsToAirtableIDs[user.slackId],
      ...user,
    }))
    // And leave out the records that have not changed
    .filter(hasUserChanged);

  console.log(`Updating ${usersToUpdate.length} users.`);
  if (debug && usersToUpdate.length) {
    console.log(
      `Slack IDs of users being updated: ${usersToUpdate.map(
        (user) => user.slackId,
      )}`,
    );
  }
  await updateSlackUsers(usersToUpdate);
}

const sleep = (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
