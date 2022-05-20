#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config

import { isDeepStrictEqual } from "util";
import { getAllWorkspaceUsers, isRegularUser, SlackUser } from "lib/slack/user";
import {
  createSlackUsers,
  getAllSlackUsers,
  SlackUser as AirtableSlackUser,
  updateSlackUsers,
} from "lib/airtable/slack-user";

const { SLACK_SYNC_TOKEN: slackToken = "", DEBUG: debug = "" } = process.env;

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
    "Downloading all Slack users of the Česko.Digital workspace. This can take a while."
  );
  const users = await getAllWorkspaceUsers(slackToken);
  const regularUsers = users.filter(isRegularUser);
  console.log(
    `Loaded ${regularUsers.length} regular users, ${users.length} users total.`
  );

  console.log("Saving users to Airtable.");
  await upsertSlackUsers(regularUsers);
  console.log("Success! 🎉");
}

function convertUser(user: SlackUser): Omit<AirtableSlackUser, "id"> {
  return {
    slackId: user.id,
    name: user.real_name || user.name,
    email: user.profile.email,
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
    allExistingUsers.map((user) => [user.slackId, user.id])
  );

  /** A set of Slack IDs of users already stored in the DB */
  const slackIDsAlreadyInDB = new Set(
    allExistingUsers.map((user) => user.slackId)
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
        (user) => user.slackId
      )}`
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
        (user) => user.slackId
      )}`
    );
  }
  await updateSlackUsers(usersToUpdate);
}

main().catch((error) => console.log(error));
