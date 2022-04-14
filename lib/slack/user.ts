import { getAllPages } from "./utils";
import slack from "slack";
import {
  boolean,
  decodeType,
  optional,
  record,
  string,
} from "typescript-json-decoder";

/** Slack user profile with information such as read name or e-mail */
export type SlackProfile = decodeType<typeof decodeSlackProfile>;
export const decodeSlackProfile = record({
  real_name: optional(string),
  display_name: string,
  email: optional(string),
  image_512: optional(string),
});

/** Slack user with information such as user ID, team ID or profile */
export type SlackUser = decodeType<typeof decodeSlackUser>;
export const decodeSlackUser = record({
  id: string,
  team_id: string,
  name: string,
  real_name: optional(string),
  is_bot: boolean,
  deleted: boolean,
  is_email_confirmed: optional(boolean),
  profile: decodeSlackProfile,
});

//
// Utils
//

export const isRegularUser = (user: SlackUser) =>
  !user.is_bot && !user.deleted && user.id !== "USLACKBOT";

//
// API Calls
//

/** Return all users from a given Slack workspace */
export async function getAllWorkspaceUsers(
  token: string
): Promise<SlackUser[]> {
  return getAllPages(
    (cursor) => slack.users.list({ token, cursor }),
    (response) => response.members.map(decodeSlackUser),
    (response) => response?.response_metadata?.next_cursor
  );
}

/** Return user with given Slack ID */
export async function getSlackUser(
  token: string,
  slackId: string
): Promise<SlackUser | undefined> {
  try {
    const slackResponse = await slack.users.info({
      token,
      user: slackId,
    });
    if (!slackResponse.ok) {
      return undefined;
    }
    return decodeSlackUser(slackResponse.user);
  } catch (_) {
    return undefined;
  }
}

//
// Samples
//

/** Sample Slack profile to use in tests */
export const sampleProfilePayload = {
  title: "",
  phone: "",
  skype: "",
  real_name: "Tomáš Znamenáček",
  real_name_normalized: "Tomas Znamenacek",
  display_name: "Tomáš Znamenáček",
  display_name_normalized: "Tomas Znamenacek",
  fields: null,
  status_text: "",
  status_emoji: "",
  status_emoji_display_info: [],
  status_expiration: 0,
  avatar_hash: "g64fe32e779a",
  first_name: "Tomáš",
  last_name: "Znamenáček",
  image_24: "https://…24.png",
  image_32: "https://…32.png",
  image_48: "https://…48.png",
  image_72: "https://…72.png",
  image_192: "https://…192.png",
  image_512: "https://…512.png",
  status_text_canonical: "",
  team: "TG21XF887",
};

/** Sample Slack user to use in tests */
export const sampleUserPayload = {
  id: "U038G4SGK9Q",
  team_id: "TG21XF887",
  name: "zoul_test",
  deleted: false,
  color: "9b3b45",
  real_name: "Tomáš Znamenáček",
  tz: "Europe/Belgrade",
  tz_label: "Central European Time",
  tz_offset: 3600,
  profile: sampleProfilePayload,
  is_admin: false,
  is_owner: false,
  is_primary_owner: false,
  is_restricted: false,
  is_ultra_restricted: false,
  is_bot: false,
  is_app_user: false,
  updated: 1648114412,
  is_email_confirmed: true,
  who_can_share_contact_card: "EVERYONE",
  presence: "away",
};
