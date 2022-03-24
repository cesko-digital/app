import {
  DecoderFunction,
  decodeType,
  literal,
  record,
  string,
  union,
} from "typescript-json-decoder";
import { decodeSlackUser } from "./user";

/** A team join event */
export type TeamJoinEvent = decodeType<typeof decodeTeamJoinEvent>;
export const decodeTeamJoinEvent = record({
  type: literal("team_join"),
  user: decodeSlackUser,
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

/** Incoming message is either the initial handshake or an event callback */
export type IncomingMessage = decodeType<typeof decodeIncomingMessage>;
export const decodeIncomingMessage = union(
  decodeEndpointHandshake,
  decodeEventCallback(decodeTeamJoinEvent)
);
