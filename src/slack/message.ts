import type { Block, KnownBlock } from "@slack/types";
import { WebClient } from "@slack/web-api";
import {
  boolean,
  literal,
  optional,
  record,
  string,
  type decodeType,
} from "typescript-json-decoder";

import { getAllPages } from "./paging";

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
  channel: string,
): Promise<MessageEvent[]> {
  const slack = new WebClient(token);
  return getAllPages(
    (cursor) => slack.conversations.history({ token, channel, cursor }),
    (response) => (response.messages ?? []).map(decodeMessageEvent),
    (response) => response?.response_metadata?.next_cursor,
  );
}

/** Get permalink to message with given timestamp */
export async function getMessagePermalink(
  token: string,
  channel: string,
  messageTimestamp: string,
): Promise<string | undefined> {
  const slack = new WebClient(token);
  return slack.chat
    .getPermalink({ token, channel, message_ts: messageTimestamp })
    .then((response) => response.permalink);
}

/** Get all replies to message identified by given timestamp */
export async function getMessageReplies(
  token: string,
  channel: string,
  timestamp: string,
): Promise<MessageEvent[]> {
  const slack = new WebClient(token);
  return slack.conversations
    .replies({ token, channel, ts: timestamp })
    .then((response) => (response.messages ?? []).map(decodeMessageEvent));
}

/**
 * Send direct message to user with given Slack ID.
 * Optionally, you can provide blocks for rich text formatting. For further info see:
 * https://api.slack.com/block-kit/building
 * */
export async function sendDirectMessage(
  token: string,
  user: string,
  text: string,
  blocks?: (KnownBlock | Block)[],
) {
  const slack = new WebClient(token);
  const decodeResponse = record({
    ok: boolean,
    channel: record({
      id: string,
    }),
  });
  const channel = await slack.conversations
    .open({ token, users: user })
    .then(decodeResponse)
    .then((response) => response.channel.id);
  await slack.chat.postMessage({
    channel,
    token,
    text,
    blocks,
  });
}
