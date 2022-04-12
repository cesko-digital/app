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

export interface Schema extends FieldSet {
  name: string;
  email: string;
  slackId: string;
  slackAvatarUrl: string;
}

export const slackUserTable = (base: AirtableBase) =>
  base<Schema>("Slack Users 2.0");

export type SlackUser = decodeType<typeof decodeSlackUser>;

export const decodeSlackUser = record({
  id: string,
  slackId: string,
  name: string,
  email: optional(string),
  slackAvatarUrl: optional(string),
});

export function getAllSlackUsers(): SelectRequest<SlackUser[], Schema> {
  return {
    method: "SELECT",
    params: {},
    decodeResponse: decodeUserRecords,
  };
}

export function createSlackUsers(
  users: Omit<SlackUser, "id">[]
): CreateRequest<SlackUser[], Schema> {
  return {
    method: "CREATE",
    recordsData: users,
    decodeResponse: decodeUserRecords,
  };
}

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
