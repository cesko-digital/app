import { FieldSet } from "airtable";
import { mergeFields, SelectRequest, UpdateRequest } from "./airtable-request";
import { AirtableBase } from "airtable/lib/airtable_base";
import {
  array,
  decodeType,
  optional,
  record,
  string,
  union,
} from "typescript-json-decoder";

/** The Airtable schema of the user profile table */
export interface Schema extends FieldSet {
  name: string;
  email: string;
  skills: ReadonlyArray<string>;
  slackId: string;
  state: string;
  createdAt: string;
  lastModifiedAt: string;
}

/** Get user profile table from given Airtable base */
export const userProfileTable = (base: AirtableBase) =>
  base<Schema>("Profiles 2.0");

/** A user profile type */
export type UserProfile = decodeType<typeof decodeUserProfile>;

/** Decode `UserProfile` from an incoming object (usually an Airtable record) */
export const decodeUserProfile = record({
  id: string,
  name: string,
  email: string,
  skills: array(string),
  slackId: optional(string),
  state: union("unconfirmed", "confirmed"),
  createdAt: string,
  lastModifiedAt: string,
});

/** Get user profile with given Slack ID */
export const getUserProfile = (slackId: string) =>
  getFirstMatchingUserProfile(`{slackId} = "${slackId}"`);

/** Get user profile with given e-mail */
export const getUserProfileByMail = (email: string) =>
  getFirstMatchingUserProfile(`{email} = "${email}"`);

/** Return first user profile that matches given formula query */
export function getFirstMatchingUserProfile(
  filterByFormula: string
): SelectRequest<UserProfile | undefined, Schema> {
  return {
    method: "SELECT",
    params: {
      filterByFormula,
      maxRecords: 1,
    },
    decodeResponse: (records) => {
      if (records.length > 0) {
        const fields = mergeFields(records[0]) as any;
        return decodeUserProfile(fields);
      } else {
        return undefined;
      }
    },
  };
}

/** Update user profile with given Airtable record ID */
export function updateUserProfile(
  recordId: string,
  fields: Partial<
    Pick<UserProfile, "name" | "email" | "skills" | "slackId" | "state">
  >
): UpdateRequest<UserProfile, Schema> {
  return {
    method: "UPDATE",
    recordId,
    recordFields: fields,
    decodeResponse: (record) => decodeUserProfile(mergeFields(record) as any),
  };
}
