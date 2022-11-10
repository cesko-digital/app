import { FieldSet } from "airtable";
import { relationToZeroOrOne, takeFirst, withDefault } from "../decoding";
import { unique } from "lib/utils";
import {
  unwrapRecord,
  unwrapRecords,
  volunteerManagementBase,
} from "./request";
import {
  array,
  decodeType,
  field,
  optional,
  record,
  string,
  union,
} from "typescript-json-decoder";

/** The Airtable schema of the user profile table */
export interface Schema extends FieldSet {
  id: string;
  name: string;
  email: string;
  skills: ReadonlyArray<string>;
  competencies: string;
  occupation: string;
  organizationName: string;
  profileUrl: string;
  slackUser: ReadonlyArray<string>;
  slackId: ReadonlyArray<string>;
  state: string;
  createdAt: string;
  lastModifiedAt: string;
}

/** The user profile table in Airtable */
export const userProfileTable =
  volunteerManagementBase<Schema>("User Profiles");

/** A user profile type */
export type UserProfile = decodeType<typeof decodeUserProfile>;

/** Decode `UserProfile` from DB schema */
export const decodeUserProfile = record({
  id: string,
  name: string,
  email: string,
  contactEmail: relationToZeroOrOne,
  // TBD: Once the skill migration is over, consolidate these two props to a single
  // one (skills?: string) and stop making a difference between undefined and "".
  skills: withDefault(array(string), []),
  competencies: optional(string),
  occupation: optional(string),
  organizationName: optional(string),
  profileUrl: optional(string),
  slackUserRelationId: field("slackUser", relationToZeroOrOne),
  slackId: relationToZeroOrOne,
  state: union("unconfirmed", "confirmed"),
  createdAt: optional(string),
  lastModifiedAt: string,
});

/** Encode `UserProfile` to DB schema */
export function encodeUserProfile(
  profile: Partial<UserProfile>
): Partial<Schema> {
  return {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    // This is weird but apparently there might be duplicate skill
    // IDs in records we get from the API, and then we get an error
    // trying to write the values back in. So we make sure the values
    // are unique.
    skills: profile.skills ? unique(profile.skills) : undefined,
    competencies: profile.competencies,
    occupation: profile.occupation,
    organizationName: profile.organizationName,
    profileUrl: profile.profileUrl,
    state: profile.state,
    slackUser: profile.slackUserRelationId
      ? [profile.slackUserRelationId]
      : undefined,
    createdAt: profile.createdAt,
  };
}

//
// API Calls
//

/**
 * Get number of people in the community
 *
 * Surprisingly, Airtable’s API doesn’t seem to offer any way to just return the row
 * count, so we have to get all rows and count those 🤦‍♂️ Which means the call takes a
 * long time, please cache accordingly.
 */
export const getMemberCount = async () =>
  (await userProfileTable.select({ fields: [] }).all()).length;

/** Get all user profiles */
export const getAllUserProfiles = async () =>
  await userProfileTable
    .select()
    .all()
    .then(unwrapRecords)
    .then(array(decodeUserProfile));

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
  profile: Partial<
    Pick<
      UserProfile,
      | "name"
      | "skills"
      | "competencies"
      | "slackUserRelationId"
      | "state"
      | "createdAt"
    >
  >
): Promise<UserProfile> {
  return await userProfileTable
    .update(recordId, encodeUserProfile(profile))
    .then(unwrapRecord)
    .then(decodeUserProfile);
}

/** Create new user profile */
export async function createUserProfile(
  profile: Pick<
    UserProfile,
    | "name"
    | "email"
    | "skills"
    | "competencies"
    | "occupation"
    | "organizationName"
    | "profileUrl"
    | "state"
    | "slackUserRelationId"
    | "createdAt"
  >
): Promise<UserProfile> {
  return await userProfileTable
    .create(encodeUserProfile(profile))
    .then(unwrapRecord)
    .then(decodeUserProfile);
}
