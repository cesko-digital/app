import { decodeSlackUser } from "./user";
import {
  DecoderFunction,
  decodeType,
  literal,
  optional,
  record,
  string,
} from "typescript-json-decoder";

/** A team join event */
export type TeamJoinEvent = decodeType<typeof decodeTeamJoinEvent>;
export const decodeTeamJoinEvent = record({
  type: literal("team_join"),
  user: decodeSlackUser,
});

/** A message was sent to a channel */
export type MessageEvent = decodeType<typeof decodeMessageEvent>;
export const decodeMessageEvent = record({
  type: literal("message"),
  subtype: optional(string),
  channel: string,
  user: string,
  text: string,
  channel_type: string,
  thread_ts: optional(string),
});

/** A generic event callback with a customizable event decoder */
export type EventCallback = decodeType<typeof decodeEventCallback>;
export const decodeEventCallback = <Event>(
  decodeEvent: DecoderFunction<Event>
) =>
  record({
    token: string,
    team_id: string,
    api_app_id: string,
    type: literal("event_callback"),
    event: decodeEvent,
  });

/** The initial handshake challenge sent by Slack to verify endpoint authenticity */
export type EndpointHandshake = decodeType<typeof decodeEndpointHandshake>;
export const decodeEndpointHandshake = record({
  token: string,
  challenge: string,
  type: literal("url_verification"),
});

//
// Helpers
//

/**
 * Does a message event represent a regular, new topic message to the channel?
 *
 * Returns `false` for channel join messages, thread replies, …
 */
export const isRegularNewTopicMessage = (event: MessageEvent) =>
  event.channel_type === "channel" && !event.subtype && !event.thread_ts;
