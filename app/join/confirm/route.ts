import { type NextRequest } from "next/server";

import { union } from "typescript-json-decoder";

import { confirmUserAccount, sendWelcomeMessage } from "~/src/onboarding";
import {
  decodeEndpointHandshake,
  decodeEventCallback,
  decodeTeamJoinEvent,
} from "~/src/slack/events";
import {
  signatureHeader,
  timestampHeader,
  validateTeamJoinEvent,
} from "~/src/slack/signing";

const { SLACK_SIGNING_SECRET = "" } = process.env;

/** Mark user account as confirmed when user successfully signs in to Slack */
export default async function POST(request: NextRequest): Promise<Response> {
  /** Incoming message is either the initial handshake or an event callback */
  const decodeIncomingMessage = union(
    decodeEndpointHandshake,
    decodeEventCallback(decodeTeamJoinEvent),
  );
  try {
    // We need to get the raw body here to calculate the checksum
    const rawBody = await request.text();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = JSON.parse(rawBody);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const msg = decodeIncomingMessage(body);
    switch (msg.type) {
      // This is just Slack making sure we own the endpoint
      case "url_verification":
        return new Response(msg.challenge, { status: 200 });

      // This is Slack telling us we have a new user. Now we need to find
      // the yet-unconfirmed account in the DB by mail and confirm it + add
      // the Slack user ID.
      case "event_callback":
        // Validate message signature
        const timestamp = request.headers.get(timestampHeader)!;
        const expectedSignature = request.headers.get(signatureHeader)!;
        const status = validateTeamJoinEvent({
          timestamp,
          expectedSignature,
          signingSecret: SLACK_SIGNING_SECRET,
          messageBody: rawBody,
          profile: msg.event.user,
        });

        switch (status) {
          case "signature_mismatch":
            return new Response("Message signature does not match", {
              status: 401,
            });
          case "timestamp_expired":
            return new Response("Timestamp invalid", { status: 401 });
          case "wrong_team":
            return new Response("Wrong Slack team", { status: 401 });
          case "ok":
            await confirmUserAccount(msg.event.user.id);
            await sendWelcomeMessage(msg.event.user.id);
            return new Response("Account confirmed", { status: 204 });
        }
    }
  } catch (e) {
    console.error(e);
    return new Response("Sorry :(", { status: 500 });
  }
}
