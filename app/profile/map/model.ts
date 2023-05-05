import { UserProfile } from "lib/airtable/user-profile";

export type MapMember = Pick<
  UserProfile,
  "name" | "slackId" | "slackAvatarUrl" | "slackProfileUrl"
>;

export type MapModel = Record<string, MapMember[]>;
