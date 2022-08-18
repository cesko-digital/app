import { getAllPages } from "./utils";
import slack from "slack";
import {
  decodeType,
  literal,
  optional,
  record,
  string,
} from "typescript-json-decoder";

/** A message was sent to a channel */
export type MessageEvent = decodeType<typeof decodeMessageEvent>;
export const decodeMessageEvent = record({
  type: literal("message"),
  subtype: optional(string),
  channel: optional(string),
  user: optional(string),
  text: optional(string),
  channel_type: optional(string),
  thread_ts: optional(string),
  ts: optional(string),
});

//
// API Calls
//

/** Get **all** messages from given channel */
export async function getAllChannelMessages(
  token: string,
  channel: string
): Promise<MessageEvent[]> {
  return getAllPages(
    (cursor) => slack.conversations.history({ token, channel, cursor }),
    (response) => response.messages.map(decodeMessageEvent),
    (response) => response?.response_metadata?.next_cursor
  );
}

/** Get permalink to message with given timestamp */
export async function getMessagePermalink(
  token: string,
  channel: string,
  messageTimestamp: string
): Promise<string> {
  return slack.chat
    .getPermalink({ token, channel, message_ts: messageTimestamp })
    .then((response) => response.permalink);
}

/** Get all replies to message identified by given timestamp */
export async function getMessageReplies(
  token: string,
  channel: string,
  timestamp: string
): Promise<MessageEvent[]> {
  return slack.conversations
    .replies({ token, channel, ts: timestamp })
    .then((response) => response.messages.map(decodeMessageEvent));
}
