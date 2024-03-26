import { type NextRequest } from "next/server";

import { union } from "typescript-json-decoder";

import { linkAccount } from "~/src/data/auth";
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

/**
 * This webhook is called when new user joins our Slack workspace.
 */
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

/**
 * Handle new user joining our Slack workspace
 *
 * Since our user registration is no longer tied to Slack we don’t really
 * have to do anything here. But as a convenience we want to (1) add the user to
 * our Slack Users database and, if possible, (2) pair the record with the appropriate
 * user record in the User Profiles table and (3) allow Slack sign-in by adding
 * a record to the Accounts table.
 *
 * This “smart pairing” can *only* be done if the e-mail address of the new
 * Slack account matches an existing user profile *and* the Slack e-mail address
 * is verified.
 */
export async function handleNewSlackUser(slackId: string) {
  // We already got the user object from the Slack callback, but
  // it’s not a full-featured object, it doesn’t have the e-mail
  // address, so we retrieve the full user object here.
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
  // This makes sense regardless of the following steps.
  const slackUserInDB = await upsertSlackUser({
    slackId: slackUser.id,
    name: slackUser.real_name ?? slackUser.name,
    email: normalizedEmail,
    contactEmail: undefined,
    slackAvatarUrl: slackUser.profile.image_512,
    userProfileRelationId: undefined,
  });

  // Only continue if there is a verified e-mail address associated with the Slack account
  if (!normalizedEmail || !slackUser.is_email_confirmed) {
    console.info(
      `Have new Slack user ${slackId}, but e-mail is missing or not verified, ignoring.`,
    );
    return;
  }

  // Get user profile that matches the verified e-mail address from Slack
  const userProfile = await getUserProfileByMail(normalizedEmail);

  // If there is no such user profile, there’s nothing else to do`
  if (!userProfile) {
    console.info(
      `No existing user profile matches new Slack user ${slackId}, ignoring.`,
    );
    return;
  }

  // Not sure how this could happen, but let’s keep the diagnostics tight here
  if (userProfile.slackId) {
    console.warn(
      `User profile ${userProfile.id} already paired to a Slack account, ignoring.`,
    );
    return;
  }

  // Link existing user profile to new Slack account
  await updateUserProfile(userProfile.id, {
    slackUserRelationId: slackUserInDB.id,
  });

  // Add new Accounts record that allows the user to sign in using the Slack account
  await linkAccount({
    userId: userProfile.id,
    providerAccountId: slackId,
    provider: "slack",
    type: "oauth",
  });
}
