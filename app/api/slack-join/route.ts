import { type NextRequest } from "next/server";

import { union } from "typescript-json-decoder";

import { upsertSlackUser } from "~/src/data/slack-user";
import {
  getUserProfileByMail,
  updateUserProfile,
} from "~/src/data/user-profile";
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
import { getSlackUser, isRegularUser } from "~/src/slack/user";
import { map, normalizeEmailAddress } from "~/src/utils";

const { SLACK_SIGNING_SECRET = "", SLACK_SYNC_TOKEN = "" } = process.env;

export async function POST(request: NextRequest): Promise<Response> {
  /** Incoming message is either the initial handshake or an event callback */
  const decodeIncomingMessage = union(
    decodeEndpointHandshake,
    decodeEventCallback(decodeTeamJoinEvent),
  );
  try {
    // We need to get the raw body here to calculate the checksum
    const rawBody = await request.text();
    const msg = decodeIncomingMessage(JSON.parse(rawBody));
    switch (msg.type) {
      // This is just Slack making sure we own the endpoint
      case "url_verification":
        return new Response(msg.challenge, { status: 200 });
      // This is Slack telling us we have a new user
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
            await handleNewSlackUser(msg.event.user.id);
            return new Response(null, { status: 204 });
        }
    }
  } catch (e) {
    console.error(e);
    return new Response("Sorry :(", { status: 500 });
  }
}

export async function handleNewSlackUser(slackId: string) {
  // We need the full user object to get to the e-mail
  const slackUser = await getSlackUser(SLACK_SYNC_TOKEN, slackId);
  const normalizedEmail = map(slackUser.profile.email, normalizeEmailAddress);

  // Ignore non-regular “users” such as apps
  if (!isRegularUser(slackUser)) {
    console.info(
      `Received Slack team_join event for non-regular user ${slackId}, ignoring`,
    );
    return;
  }

  // Save the new Slack user to the Slack Users DB table.
  // This makes sense even if the following steps fail.
  const slackUserInDB = await upsertSlackUser({
    slackId: slackUser.id,
    name: slackUser.real_name ?? slackUser.name,
    email: normalizedEmail,
    contactEmail: undefined,
    slackAvatarUrl: slackUser.profile.image_512,
    userProfileRelationId: undefined,
  });

  // Without an e-mail address we can’t confirm the account
  if (!normalizedEmail) {
    console.error(
      `Account confirmation failed, missing email addres for user ${slackId}`,
    );
    return;
  }

  // Get the initial user profile we are trying to confirm
  const initialProfile = await getUserProfileByMail(normalizedEmail)
    // Return null on errors
    .catch(() => null);

  // The profile may not exist if the user skipped onboarding somehow
  if (!initialProfile) {
    console.error(
      `Account confirmation failed, user profile not found for user “${slackId}”`,
    );
    return;
  }

  // Not sure how this could happen, but let’s keep the diagnostics tight here
  if (initialProfile.state === "confirmed" && initialProfile.slackId) {
    console.warn(`Account “${slackId}” already confirmed, skipping`);
    return;
  }

  // Flip account to confirmed and link the associated Slack user
  await updateUserProfile(initialProfile.id, {
    slackUserRelationId: slackUserInDB.id,
    state: "confirmed",
  });
}
