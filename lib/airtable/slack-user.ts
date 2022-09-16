import { FieldSet } from "airtable";
import { relationToZeroOrOne, takeFirst } from "lib/decoding";
import {
  array,
  decodeType,
  field,
  optional,
  record,
  string,
} from "typescript-json-decoder";
import {
  volunteerManagementBase,
  unwrapRecords,
  createBatch,
  updateBatch,
} from "./request";

/** The Airtable schema of the Slack user table */
export interface Schema extends FieldSet {
  id: string;
  name: string;
  email: string;
  slackId: string;
  slackAvatarUrl: string;
  userProfile: ReadonlyArray<string>;
}

/** Slack Users table */
export const slackUsersTable = volunteerManagementBase<Schema>("Slack Users");

/** Slack user as stored in Airtable */
export type SlackUser = decodeType<typeof decodeSlackUser>;

/** Decode `SlackUser` from DB schema */
export const decodeSlackUser = record({
  id: string,
  slackId: string,
  name: string,
  email: optional(string),
  contactEmail: optional(string),
  slackAvatarUrl: optional(string),
  userProfileRelationId: field("userProfile", relationToZeroOrOne),
});

/** Encode `SlackUser` to DB schema */
export function encodeSlackUser(user: Partial<SlackUser>): Partial<Schema> {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    contactEmail: user.contactEmail,
    slackId: user.slackId,
    slackAvatarUrl: user.slackAvatarUrl,
    userProfile: user.userProfileRelationId
      ? [user.userProfileRelationId]
      : undefined,
  };
}

//
// API Calls
//

/** Get Slack user by Slack ID */
export async function getSlackUserBySlackId(
  slackId: string
): Promise<SlackUser> {
  return await slackUsersTable
    .select({
      filterByFormula: `{slackId} = "${slackId}"`,
      maxRecords: 1,
    })
    .all()
    .then(unwrapRecords)
    .then(takeFirst(decodeUsers));
}

/** Get all Slack users stored in Airtable */
export async function getAllSlackUsers(): Promise<SlackUser[]> {
  return await slackUsersTable
    .select()
    .all()
    .then(unwrapRecords)
    .then(decodeUsers);
}

/** Create new Slack users in Airtable */
export async function createSlackUsers(
  users: Omit<SlackUser, "id">[]
): Promise<SlackUser[]> {
  const records = users.map(encodeSlackUser);
  return await createBatch(slackUsersTable, records)
    .then(unwrapRecords)
    .then(decodeUsers);
}

/** Update Slack users in Airtable */
export async function updateSlackUsers(
  users: SlackUser[]
): Promise<SlackUser[]> {
  const records = users.map(encodeSlackUser);
  return await updateBatch(slackUsersTable, records)
    .then(unwrapRecords)
    .then(decodeUsers);
}

/** Insert or update Slack user identified by his/her Slack ID */
export async function upsertSlackUser(
  user: Omit<SlackUser, "id">
): Promise<SlackUser> {
  const existingRecord = await getSlackUserBySlackId(user.slackId).catch(
    () => null
  );
  if (existingRecord) {
    // User already exists, so let’s just update the info
    const updatedUsers = await updateSlackUsers([
      { id: existingRecord.id, ...user },
    ]);
    return updatedUsers[0];
  } else {
    // User doesn’t exist, insert new record
    const createdUsers = await createSlackUsers([user]);
    return createdUsers[0];
  }
}

//
// Helpers
//

/** Decode an array of `SlackUser` objects */
const decodeUsers = array(decodeSlackUser);
