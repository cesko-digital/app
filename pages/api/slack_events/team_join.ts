import Airtable from "airtable";
import { send } from "lib/airtable/request";
import { decodeIncomingMessage } from "lib/slack/events";
import { NextApiRequest, NextApiResponse } from "next";
import { getSlackUser } from "lib/slack/user";
import { createSlackUsers, slackUserTable } from "lib/airtable/slack-user";
import {
  getUserProfileByMail,
  updateUserProfile,
  userProfileTable,
} from "lib/airtable/user-profile";
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

const {
  SLACK_SIGNING_SECRET = "",
  SLACK_SYNC_TOKEN = "",
  AIRTABLE_API_KEY = "",
} = process.env;

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
            response.status(204).end();
            return;
        }
    }
  } catch (e) {
    console.error(e);
    response.status(500).send("Sorry :(");
  }
}

/**
 * Confirm the new user in the DB
 *
 * To confirm the account, we have to create a new record in the Slack Users
 * table, link it to the record in the User Profiles table and mark the user
 * profile as confirmed.
 */
async function confirmUserAccount(slackId: string) {
  // The `user` object from Slack does not include the email,
  // so we have to make an extra API request to get it.
  const slackUser = await getSlackUser(SLACK_SYNC_TOKEN, slackId);
  const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
    "apppZX1QC3fl1RTBM"
  );

  // Save the new Slack user to the Slack Users DB table.
  // This makes sense even if the following steps fail.
  await send(
    slackUserTable(base),
    createSlackUsers([
      {
        slackId: slackUser.id,
        name: slackUser.real_name || slackUser.name,
        email: slackUser.profile.email,
        slackAvatarUrl: slackUser.profile.image_512,
        userProfileRelationId: undefined,
      },
    ])
  );

  // Without an e-mail address we can’t confirm the account
  const { email } = slackUser.profile;
  if (!email) {
    console.error(
      `Account confirmation failed, missing email addres for user ${slackId}`
    );
    return;
  }

  // Get the initial user profile we are trying to confirm
  const initialProfile = await send(
    userProfileTable(base),
    getUserProfileByMail(email)
  );

  // This can routinely happen if the user skipped onboarding somehow
  if (!initialProfile) {
    console.error(
      `Account confirmation failed, user profile not found for user “${slackId}”`
    );
    return;
  }

  // Not sure how this could happen, but let’s keep the diagnostics tight here
  if (initialProfile.state === "confirmed" && initialProfile.slackId) {
    console.warn(`Account “${slackId}” already confirmed, skipping`);
    return;
  }

  // Flip account to confirmed and link the associated Slack user
  await send(
    userProfileTable(base),
    updateUserProfile(initialProfile.id, {
      slackUserRelationId: slackUser.id,
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
