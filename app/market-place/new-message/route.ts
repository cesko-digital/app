import { type NextRequest } from "next/server";

import { union } from "typescript-json-decoder";

import { receiveSlackMessage } from "~/src/market-place";
import {
  decodeEndpointHandshake,
  decodeEventCallback,
} from "~/src/slack/events";
import { decodeMessageEvent, type MessageEvent } from "~/src/slack/message";

const { SLACK_SYNC_TOKEN = "" } = process.env;

/** Receive Slack notification about new messages to the #market-place channel */
export async function POST(request: NextRequest): Promise<Response> {
  /** Valid incoming message is either an endpoint handshake or message notification, nothing else */
  const decodeIncomingMessage = union(
    decodeEndpointHandshake,
    decodeEventCallback(decodeMessageEvent),
  );
  try {
    const msg = decodeIncomingMessage(await request.json());
    switch (msg.type) {
      // This is just Slack making sure we own the endpoint
      case "url_verification":
        return new Response(msg.challenge, { status: 200 });
      // This is a new message notification.
      case "event_callback":
        await receiveSlackMessage(
          SLACK_SYNC_TOKEN,
          // The strange cast is here due to a bug in the decoding library:
          // https://github.com/tskj/typescript-json-decoder/issues/22
          msg.event as unknown as MessageEvent,
        );
        return new Response(null, { status: 204 });
    }
  } catch (e) {
    console.error(e);
    return new Response("Sorry :(", { status: 500 });
  }
}
