import { FieldSet } from "airtable";
import {
  decodeValidItemsFromArray,
  relationToZeroOrOne,
  takeFirst,
  withDefault,
} from "../decoding";
import {
  unwrapRecord,
  unwrapRecords,
  volunteerManagementBase,
} from "./request";
import {
  array,
  DecoderFunction,
  decodeType,
  field,
  nil,
  number,
  optional,
  Pojo,
  record,
  string,
  undef,
  union,
} from "typescript-json-decoder";

/** All supported notification flags */
export const notificationFlags = [
  "allowNotifications",
  "receiveNewRoleNotifications",
] as const;

/** Notification flags to turn on user e-mail notifications about various events */
export type NotificationFlag = typeof notificationFlags[number];

/** All supported feature flags */
export const featureFlags = ["notificationsBeta"] as const;

/** Feature flags to hide or show beta features */
export type FeatureFlag = typeof featureFlags[number];

/** Decode known feature flags, returning empty array for `null` or `undefined` */
const decodeFeatureFlags = decodeFlags(union(...featureFlags));

/** Decode known notification flags, returning empty array for `null` or `undefined` */
const decodeNotificationFlags = decodeFlags(union(...notificationFlags));

/** The Airtable schema of the user profile table */
export interface Schema extends FieldSet {
  id: string;
  name: string;
  email: string;
  competencies: string;
  occupation: string;
  organizationName: string;
  profileUrl: string;
  slackUser: ReadonlyArray<string>;
  slackId: ReadonlyArray<string>;
  notificationFlags: ReadonlyArray<string>;
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
  // TBD: Once the skill migration is over, rename
  skills: field("competencies", withDefault(string, "")),
  occupation: optional(string),
  organizationName: optional(string),
  profileUrl: optional(string),
  slackUserRelationId: field("slackUser", relationToZeroOrOne),
  slackId: relationToZeroOrOne,
  slackRegistrationMail: relationToZeroOrOne,
  state: union("unconfirmed", "confirmed"),
  featureFlags: decodeFeatureFlags,
  notificationFlags: decodeNotificationFlags,
  gdprPolicyAcceptedAt: optional(string),
  createdAt: optional(string),
  lastModifiedAt: string,
  daysSinceRegistered: optional(number),
});

/** Encode `UserProfile` to DB schema */
export function encodeUserProfile(
  profile: Partial<UserProfile>
): Partial<Schema> {
  return {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    competencies: profile.skills,
    occupation: profile.occupation,
    organizationName: profile.organizationName,
    profileUrl: profile.profileUrl,
    state: profile.state,
    notificationFlags: profile.notificationFlags,
    slackUser: profile.slackUserRelationId
      ? [profile.slackUserRelationId]
      : undefined,
    createdAt: profile.createdAt,
    gdprPolicyAcceptedAt: profile.gdprPolicyAcceptedAt,
  };
}

//
// API Calls
//

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
      | "slackUserRelationId"
      | "state"
      | "createdAt"
      | "gdprPolicyAcceptedAt"
      | "notificationFlags"
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
    | "occupation"
    | "organizationName"
    | "profileUrl"
    | "state"
    | "slackUserRelationId"
    | "createdAt"
    | "gdprPolicyAcceptedAt"
  >
): Promise<UserProfile> {
  return await userProfileTable
    .create(encodeUserProfile(profile))
    .then(unwrapRecord)
    .then(decodeUserProfile);
}

//
// Decoding Support
//

/** Decode an array of flags, skipping unknown values and returning empty array for `undefined` and `null` */
function decodeFlags<T>(decodeSingleFlag: DecoderFunction<T>) {
  const decoder = union(
    undef,
    nil,
    decodeValidItemsFromArray(decodeSingleFlag, "Flags", () => {
      /* silence logs */
    })
  );
  return (value: Pojo) => {
    const decoded = decoder(value);
    return decoded ?? [];
  };
}
