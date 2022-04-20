import { FieldSet } from "airtable";
import { relationToOne, takeFirst, withDefault } from "../decoding";
import {
  unwrapRecord,
  unwrapRecords,
  volunteerManagementBase,
} from "./request";
import {
  array,
  decodeType,
  field,
  record,
  string,
  union,
} from "typescript-json-decoder";

/** The Airtable schema of the user profile table */
export interface Schema extends FieldSet {
  name: string;
  email: string;
  skills: ReadonlyArray<string>;
  slackUser: ReadonlyArray<string>;
  slackId: ReadonlyArray<string>;
  state: string;
  createdAt: string;
  lastModifiedAt: string;
}

/** The user profile table in Airtable */
export const userProfileTable =
  volunteerManagementBase<Schema>("User Profiles 2.0");

/** A user profile type */
export type UserProfile = decodeType<typeof decodeUserProfile>;

/** Decode `UserProfile` from an incoming object (usually an Airtable record) */
export const decodeUserProfile = record({
  id: string,
  name: string,
  email: string,
  skills: withDefault(array(string), []),
  slackUserRelationId: field("slackUser", relationToOne),
  slackId: relationToOne,
  state: union("unconfirmed", "confirmed"),
  createdAt: string,
  lastModifiedAt: string,
});

//
// API Calls
//

/** Get user profile with given Slack ID */
export const getUserProfile = (slackId: string) =>
  getFirstMatchingUserProfile(`{slackId} = "${slackId}"`);

/** Get user profile with given e-mail */
export const getUserProfileByMail = (email: string) =>
  getFirstMatchingUserProfile(`{email} = "${email}"`);

/** Return first user profile that matches given formula query */
export async function getFirstMatchingUserProfile(
  filterByFormula: string
): Promise<UserProfile> {
  return await userProfileTable
    .select({
      filterByFormula,
      maxRecords: 1,
    })
    .all()
    .then(unwrapRecords)
    .then(takeFirst(array(decodeUserProfile)));
}

/** Update user profile with given Airtable record ID */
export async function updateUserProfile(
  recordId: string,
  fields: Partial<
    Pick<
      UserProfile,
      "name" | "email" | "skills" | "slackUserRelationId" | "state"
    >
  >
): Promise<UserProfile> {
  return await userProfileTable
    .update(recordId, fields) // TODO: Properly encode fields
    .then(unwrapRecord)
    .then(decodeUserProfile);
}

/** Create new user profile */
export async function createUserProfile(
  profile: Pick<UserProfile, "name" | "email" | "skills">
): Promise<UserProfile> {
  const { name, email, skills } = profile;
  const encoded = {
    name,
    email,
    skills,
    state: "unconfirmed",
  };
  return await userProfileTable
    .create([encoded])
    .then(unwrapRecords)
    .then(takeFirst(array(decodeUserProfile)));
}
