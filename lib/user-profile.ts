import {
  array,
  decodeType,
  optional,
  record,
  string,
  union,
} from "typescript-json-decoder";

export type UserProfile = decodeType<typeof decodeUserProfile>;
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
