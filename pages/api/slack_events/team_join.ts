import Airtable from "airtable";
import { send } from "lib/airtable-request";
import { decodeIncomingMessage } from "lib/slack/events";
import { NextApiRequest, NextApiResponse } from "next";
import {
  getUserProfileByMail,
  updateUserProfile,
  userProfileTable,
} from "lib/user-profile";
import { getMessageSignature, SlackHeader } from "lib/slack/signing";

// By default Next.js would parse `request.body` to JSON automatically.
// But we need the raw request body to compute the request signature, so
// we disable the automatic parser here.
export const config = {
  api: {
    bodyParser: false,
  },
};

/** Mark user account as confirmed when user successfully signs in to Slack */
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
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
        const timestamp = request.headers[SlackHeader.timestamp] as string;
        const presentedSignature = request.headers[SlackHeader.signature];
        const secret = process.env.SLACK_SIGNING_SECRET as string;
        if (!timestamp || !presentedSignature) {
          response.status(401).send("Missing request timestamp or signature");
          return;
        }
        const computedSignature = getMessageSignature(
          timestamp,
          rawBody,
          secret
        );
        if (computedSignature !== presentedSignature) {
          response.status(401).send("Message signature does not match");
          return;
        }

        // Confirm user account
        const {
          id,
          profile: { email },
        } = msg.event.user;
        if (email) {
          await confirmUserAccount(id, email);
        } else {
          console.error(
            `Email field in Slack profile empty when trying to confirm user “${id}”`
          );
        }
        response.status(204).end();
        return;
    }
  } catch (e) {
    console.log(e);
    response.status(400).send("Don’t understand");
  }
}

async function confirmUserAccount(slackId: string, email: string) {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const base = new Airtable({ apiKey }).base("apppZX1QC3fl1RTBM");
  const table = userProfileTable(base);

  const initialProfile = await send(table, getUserProfileByMail(email));

  // This can routinely happen if the user skipped onboarding somehow
  if (!initialProfile) {
    console.error(
      `Unconfirmed account not found when trying to confirm user “${slackId}” (${email})`
    );
    return;
  }

  // Not sure how this could happen, but let’s keep the diagnostics tight here
  if (initialProfile.state === "confirmed" && initialProfile.slackId) {
    console.warn(`Account “${slackId}” already confirmed, skipping`);
    return;
  }

  await send(
    table,
    updateUserProfile(initialProfile.id, {
      slackId,
      state: "confirmed",
    })
  );
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
