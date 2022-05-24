import { FieldSet } from "airtable";
import { withDefault, takeFirst } from "lib/decoding";
import { unwrapRecords, webBase } from "./request";
import {
  array,
  DecoderFunction,
  decodeType,
  field,
  optional,
  record,
  string,
  union,
} from "typescript-json-decoder";

/** The Airtable schema of the Teams table */
export interface Schema extends FieldSet {
  user: ReadonlyArray<string>;
  project: ReadonlyArray<string>;
  role: string;
  startDate: string;
  endDate: string;
  userName: string;
  userEmail: string;
  userSlackId: string;
  permissions: ReadonlyArray<string>;
}

/** Teams table */
export const teamsTable = webBase<Schema>("Teams");

/** Team engagement */
export type TeamEngagement = decodeType<typeof decodeTeamEngagement>;

/** Helper to decode lookup fields */
const lookupField = <T>(decoder: DecoderFunction<T>) =>
  takeFirst(array(decoder));

/** Decode `TeamEngagement` from DB schema */
export const decodeTeamEngagement = record({
  userId: field("user", lookupField(string)),
  projectId: field("project", lookupField(string)),
  role: optional(string),
  startDate: optional(string),
  endDate: optional(string),
  userName: lookupField(string),
  userEmail: lookupField(string),
  userSlackId: lookupField(string),
  permissions: withDefault(
    array(
      union("publikovat na webu", "publikovat e-mail", "publikovat Slack ID")
    ),
    []
  ),
});

//
// API Calls
//

export async function getAllTeamEngagements(): Promise<TeamEngagement[]> {
  return await teamsTable
    .select()
    .all()
    .then(unwrapRecords)
    .then(array(decodeTeamEngagement));
}
