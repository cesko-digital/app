import { NextApiRequest, NextApiResponse } from "next";
import { union } from "typescript-json-decoder";
import { decodeEndpointHandshake, decodeEventCallback } from "lib/slack/events";
import { decodeMessageEvent } from "lib/slack/message";
import { receiveSlackMessage } from "lib/market-place";

const { SLACK_SYNC_TOKEN = "" } = process.env;

/** Receive Slack notification about new messages and pass them to other processes such as market-place */
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  /** Valid incoming message is either an endpoint handshake or message notification, nothing else */
  const decodeIncomingMessage = union(
    decodeEndpointHandshake,
    decodeEventCallback(decodeMessageEvent)
  );
  try {
    const msg = decodeIncomingMessage(request.body);
    switch (msg.type) {
      // This is just Slack making sure we own the endpoint
      case "url_verification":
        response.status(200).send(msg.challenge);
        return;
      // This is a new message notification.
      case "event_callback":
        await receiveSlackMessage(SLACK_SYNC_TOKEN, msg.event);
        response.status(204).end();
    }
  } catch (e) {
    console.error(e);
    response.status(500).send("Sorry :(");
  }
}
