import { NextApiRequest, NextApiResponse } from "next";
import { confirmUserAccount, sendWelcomeMessage } from "lib/onboarding";
import { union } from "typescript-json-decoder";
import {
  decodeEndpointHandshake,
  decodeEventCallback,
  decodeTeamJoinEvent,
} from "lib/slack/events";
import {
  signatureHeader,
  timestampHeader,
  validateTeamJoinEvent,
} from "lib/slack/signing";

// By default Next.js would parse `request.body` to JSON automatically.
// But we need the raw request body to compute the request signature, so
// we disable the automatic parser here.
export const config = {
  api: {
    bodyParser: false,
  },
};

const { SLACK_SIGNING_SECRET = "" } = process.env;

/** Mark user account as confirmed when user successfully signs in to Slack */
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  /** Incoming message is either the initial handshake or an event callback */
  const decodeIncomingMessage = union(
    decodeEndpointHandshake,
    decodeEventCallback(decodeTeamJoinEvent)
  );
  try {
    const rawBody = await getRawBody(request);
    const body = JSON.parse(rawBody);
    const msg = decodeIncomingMessage(body);
    switch (msg.type) {
      // This is just Slack making sure we own the endpoint
      case "url_verification":
        response.status(200).send(msg.challenge);
        return;

      // This is Slack telling us we have a new user. Now we need to find
      // the yet-unconfirmed account in the DB by mail and confirm it + add
      // the Slack user ID.
      case "event_callback":
        // Validate message signature
        const timestamp = request.headers[timestampHeader] as string;
        const expectedSignature = request.headers[signatureHeader] as string;
        const status = validateTeamJoinEvent({
          timestamp,
          expectedSignature,
          signingSecret: SLACK_SIGNING_SECRET,
          messageBody: rawBody,
          profile: msg.event.user,
        });

        switch (status) {
          case "signature_mismatch":
            response.status(401).send("Message signature does not match");
            return;
          case "timestamp_expired":
            response.status(401).send("Timestamp invalid");
            return;
          case "wrong_team":
            response.status(401).send("Wrong Slack team");
            return;
          case "ok":
            await confirmUserAccount(msg.event.user.id);
            await sendWelcomeMessage(msg.event.user.id);
            response.status(204).end();
            return;
        }
    }
  } catch (e) {
    console.error(e);
    response.status(500).send("Sorry :(");
  }
}

function getRawBody(request: NextApiRequest): Promise<string> {
  return new Promise((resolve) => {
    let data = "";
    request.on("data", (chunk) => {
      data += chunk;
    });
    request.on("end", () => {
      resolve(Buffer.from(data).toString("utf-8"));
    });
  });
}
