import Airtable, { Table } from "airtable";
import { send } from "lib/airtable/request";
import { isDeepStrictEqual } from "util";
import { getAllWorkspaceUsers, isRegularUser, SlackUser } from "lib/slack/user";
import {
  createSlackUsers,
  getAllSlackUsers,
  Schema,
  SlackUser as AirtableSlackUser,
  slackUserTable,
  updateSlackUsers,
} from "lib/airtable/slack-user";

require("dotenv").config({ path: ".env.local" });

const {
  SLACK_SYNC_TOKEN: slackToken = "",
  AIRTABLE_API_KEY: airtableToken = "",
  DEBUG: debug = "",
} = process.env;

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
  const base = new Airtable({ apiKey: airtableToken }).base(
    "apppZX1QC3fl1RTBM"
  );
  await upsertSlackUsers(slackUserTable(base), regularUsers);
  console.log("Success! 🎉");
}

function convertUser(user: SlackUser): Omit<AirtableSlackUser, "id"> {
  return {
    slackId: user.id,
    name: user.real_name || user.name,
    email: user.profile.email,
    slackAvatarUrl: user.profile.image_512,
  };
}

async function upsertSlackUsers(
  userTable: Table<Schema>,
  slackUsers: SlackUser[]
): Promise<void> {
  /** All users in the DB */
  const allExistingUsers = await send(userTable, getAllSlackUsers());
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
  await send(userTable, createSlackUsers(usersToInsert));

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
  await send(userTable, updateSlackUsers(usersToUpdate));
}

main().catch((error) => console.log(error));
