import { type FieldSet } from "airtable";
import {
  array,
  field,
  number,
  optional,
  record,
  string,
  union,
  type decodeType,
} from "typescript-json-decoder";

import { relationToZeroOrOne, takeFirst, withDefault } from "~/src/decoding";
import { decodeFlags } from "~/src/flags";
import { normalizeEmailAddress } from "~/src/utils";

import { unwrapRecord, unwrapRecords, usersBase } from "./airtable";

/** All supported notification flags */
const notificationFlags = [
  "allowNotifications",
  "receiveNewRoleNotifications",
] as const;

/** All supported feature flags */
const featureFlags = ["registrationV2", "assetUpload"] as const;

/** All supported privacy flags */
const privacyFlags = ["hidePublicTeamMembership"] as const;

/** Notification flags to turn on user e-mail notifications about various events */
export type NotificationFlag = (typeof notificationFlags)[number];

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
  slackProfileUrl: string;
  slackAvatarUrl: string;
  notificationFlags: ReadonlyArray<string>;
  privacyFlags: ReadonlyArray<string>;
  featureFlags: ReadonlyArray<string>;
  state: string;
  createdAt: string;
  lastModifiedAt: string;
}

/** The user profile table in Airtable */
export const userProfileTable = usersBase<Schema>("User Profiles");

/** Table views you can use when querying the user profile table */
export type TableView =
  | "All Profiles"
  | "Confirmed Profiles"
  | "New Role Notification Recipients"
  | "Profiles with Occupation Data"
  | "Profiles with Skills"
  | "Profiles with Districts"
  | "Missing Slack Account";

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
  slackProfileUrl: relationToZeroOrOne,
  slackAvatarUrl: relationToZeroOrOne,
  state: union("unconfirmed", "confirmed"),
  featureFlags: decodeFlags(union(...featureFlags)),
  notificationFlags: decodeFlags(union(...notificationFlags)),
  privacyFlags: decodeFlags(union(...privacyFlags)),
  availableInDistricts: optional(string),
  gdprPolicyAcceptedAt: optional(string),
  codeOfConductAcceptedAt: optional(string),
  createdAt: optional(string),
  lastModifiedAt: string,
  daysSinceRegistered: optional(number),
});

/** Encode `UserProfile` to DB schema */
export function encodeUserProfile(
  profile: Partial<UserProfile>,
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
    privacyFlags: profile.privacyFlags,
    featureFlags: profile.featureFlags,
    availableInDistricts: profile.availableInDistricts,
    slackUser: profile.slackUserRelationId
      ? [profile.slackUserRelationId]
      : undefined,
    createdAt: profile.createdAt,
    gdprPolicyAcceptedAt: profile.gdprPolicyAcceptedAt,
    codeOfConductAcceptedAt: profile.codeOfConductAcceptedAt,
  };
}

//
// API Calls
//

/** Get all user profiles */
export const getAllUserProfiles = async (view: TableView = "All Profiles") =>
  await userProfileTable
    .select({ view })
    .all()
    .then(unwrapRecords)
    .then(array(decodeUserProfile));

/** Get user by database ID */
export const getUserProfile = async (databaseId: string) =>
  await userProfileTable
    .find(databaseId)
    .then(unwrapRecord)
    .then(decodeUserProfile)
    .catch((_) => null);

/**
 * Get user profile with given e-mail
 *
 * The e-mail is normalized before querying the DB.
 */
export const getUserProfileByMail = (email: string) =>
  getFirstMatchingUserProfile(
    `{email} = "${normalizeEmailAddress(email)}"`,
  ).catch(() => null);

/** Return first user profile that matches given formula query */
export async function getFirstMatchingUserProfile(
  filterByFormula: string,
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
      | "codeOfConductAcceptedAt"
      | "notificationFlags"
      | "privacyFlags"
      | "availableInDistricts"
    >
  >,
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
    | "availableInDistricts"
    | "createdAt"
    | "gdprPolicyAcceptedAt"
    | "codeOfConductAcceptedAt"
    | "featureFlags"
  >,
): Promise<UserProfile> {
  return await userProfileTable
    .create(encodeUserProfile(profile))
    .then(unwrapRecord)
    .then(decodeUserProfile);
}
