import { NextApiRequest, NextApiResponse } from "next";
import { union } from "typescript-json-decoder";
import {
  decodeEndpointHandshake,
  decodeEventCallback,
  decodeMessageEvent,
  isRegularNewTopicMessage,
} from "lib/slack/events";

/** Mark user account as confirmed when user successfully signs in to Slack */
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
      // This is a new message notification
      case "event_callback":
        if (
          isRegularNewTopicMessage(msg.event) &&
          msg.event.channel === "C03JP5VSC00"
        ) {
          console.log(
            `New thread in #market-place-automation: ${msg.event.text}`
          );
        }
        response.status(204).end();
    }
  } catch (e) {
    console.error(e);
    response.status(500).send("Sorry :(");
  }
}
