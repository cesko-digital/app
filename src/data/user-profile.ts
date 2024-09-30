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

import {
  decodeUrl,
  relationToZeroOrOne,
  takeFirst,
  withDefault,
} from "~/src/decoding";
import { decodeFlags } from "~/src/flags";
import { defaultAvatarUrl, normalizeEmailAddress } from "~/src/utils";

import { unwrapRecord, unwrapRecords, usersBase } from "./airtable";

/** All supported notification flags */
const notificationFlags = ["receiveNewRoleNotifications"] as const;

/** All supported feature flags */
const featureFlags = ["registrationV2", "assetUpload"] as const;

/** All supported user roles */
const userRoles = ["Code of Conduct Admin", "Core Team Member"] as const;

export type UserSeniority = (typeof userSeniorities)[number];
export const userSeniorities = ["junior", "medior", "senior"] as const;

/** All supported privacy flags */
export const privacyFlags = [
  "hidePublicTeamMembership",
  "enablePublicProfile",
] as const;

type PrivacyFlag = (typeof privacyFlags)[number];
export type PrivacyFlags = PrivacyFlag[];

/** Notification flags to turn on user e-mail notifications about various events */
export type NotificationFlag = (typeof notificationFlags)[number];

/** The Airtable schema of the user profile table */
export interface Schema extends FieldSet {
  id: string;
  name: string;
  email: string;
  tags: string;
  maxSeniority: string;
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
  roles: ReadonlyArray<string>;
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
  | "Missing Slack Account"
  | "Public Profiles";

/** A user profile type */
export type UserProfile = decodeType<typeof decodeUserProfile>;

/** Decode `UserProfile` from DB schema */
export const decodeUserProfile = record({
  id: string,
  name: string,
  email: string,
  contactEmail: relationToZeroOrOne,
  tags: withDefault(string, ""),
  maxSeniority: optional(union(...userSeniorities)),
  occupation: optional(string),
  organizationName: optional(string),
  // If profile URL is malformed, parse as `undefined` instead of throwing
  profileUrl: withDefault(optional(decodeUrl), undefined),
  bio: optional(string),
  slackUserRelationId: field("slackUser", relationToZeroOrOne),
  slackId: relationToZeroOrOne,
  slackProfileUrl: relationToZeroOrOne,
  slackAvatarUrl: relationToZeroOrOne,
  avatarUrl: field(
    "slackAvatarUrl",
    withDefault(relationToZeroOrOne, defaultAvatarUrl),
  ),
  state: union("unconfirmed", "confirmed"),
  featureFlags: decodeFlags(union(...featureFlags)),
  notificationFlags: decodeFlags(union(...notificationFlags)),
  privacyFlags: decodeFlags(union(...privacyFlags)),
  roles: decodeFlags(union(...userRoles)),
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
    contactEmail: profile.contactEmail,
    tags: profile.tags,
    maxSeniority: profile.maxSeniority,
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
    bio: profile.bio,
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
    .catch((e) => {
      console.error(e);
      return null;
    });

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
      | "tags"
      | "maxSeniority"
      | "slackUserRelationId"
      | "state"
      | "createdAt"
      | "gdprPolicyAcceptedAt"
      | "codeOfConductAcceptedAt"
      | "notificationFlags"
      | "privacyFlags"
      | "contactEmail"
      | "availableInDistricts"
      | "bio"
      | "occupation"
      | "profileUrl"
      | "organizationName"
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
    | "tags"
    | "maxSeniority"
    | "occupation"
    | "organizationName"
    | "profileUrl"
    | "state"
    | "slackUserRelationId"
    | "availableInDistricts"
    | "bio"
    | "createdAt"
    | "gdprPolicyAcceptedAt"
    | "codeOfConductAcceptedAt"
    | "featureFlags"
    | "privacyFlags"
  >,
): Promise<UserProfile> {
  return await userProfileTable
    .create(encodeUserProfile(profile))
    .then(unwrapRecord)
    .then(decodeUserProfile);
}

//
// Utils
//

/**
 * Compare user profiles by name
 *
 * Uses `String.localeCompare` on the last word of the name.
 */
export const compareByName = (a: UserProfile, b: UserProfile) =>
  compareNames(a.name, b.name);

/** Locale compare strings according to their last words */
export const compareNames = (a: string, b: string) =>
  normalize(a)
    .split(/\s+/)
    .pop()!
    .localeCompare(normalize(b).split(/\s+/).pop()!);

const normalize = (s: string) =>
  s
    .replace(/^\s+/, "")
    .replace(/\s+$/, "")
    .replace(/\s*\([^)]+\)$/, "");
