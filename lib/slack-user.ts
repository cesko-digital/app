import { FieldSet } from "airtable";
import { AirtableBase } from "airtable/lib/airtable_base";
import { decodeType, optional, record, string } from "typescript-json-decoder";
import {
  CreateRequest,
  mergeFields,
  SelectRequest,
  SimpleRecords,
  BatchUpdateRequest,
  splitFields,
} from "./airtable-request";

/** The Airtable schema of the Slack user table */
export interface Schema extends FieldSet {
  name: string;
  email: string;
  slackId: string;
  slackAvatarUrl: string;
}

/** Get Slack user table from given Airtable base */
export const slackUserTable = (base: AirtableBase) =>
  base<Schema>("Slack Users 2.0");

/** Slack user as stored in Airtable */
export type SlackUser = decodeType<typeof decodeSlackUser>;

/** Decode `SlackUser` from an incoming object (usually an Airtable record) */
export const decodeSlackUser = record({
  id: string,
  slackId: string,
  name: string,
  email: optional(string),
  slackAvatarUrl: optional(string),
});

//
// API Calls
//

/** Get all Slack users stored in Airtable */
export function getAllSlackUsers(): SelectRequest<SlackUser[], Schema> {
  return {
    method: "SELECT",
    params: {},
    decodeResponse: decodeUserRecords,
  };
}

/** Create new Slack users in Airtable */
export function createSlackUsers(
  users: Omit<SlackUser, "id">[]
): CreateRequest<SlackUser[], Schema> {
  return {
    method: "CREATE",
    recordsData: users,
    decodeResponse: decodeUserRecords,
  };
}

/** Update Slack users in Airtable */
export function updateSlackUsers(
  users: SlackUser[]
): BatchUpdateRequest<SlackUser[], Schema> {
  return {
    method: "BATCH_UPDATE",
    recordsData: users.map(splitFields),
    decodeResponse: decodeUserRecords,
  };
}

const decodeUserRecords = (records: SimpleRecords<Schema>) =>
  records.map((r) => decodeSlackUser(mergeFields(r) as any));
