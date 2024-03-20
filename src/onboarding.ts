import { upsertSlackUser } from "~/src/data/slack-user";
import {
  getUserProfileByMail,
  updateUserProfile,
} from "~/src/data/user-profile";
import { getSlackUser, isRegularUser } from "~/src/slack/user";
import { map, normalizeEmailAddress } from "~/src/utils";

const { SLACK_SYNC_TOKEN = "" } = process.env;

/**
 * Confirm user account when user joins Slack
 *
 * To confirm the account, we have to create a new record in the Slack Users
 * table, link it to the record in the User Profiles table and mark the user
 * profile as confirmed.
 */
export async function confirmUserAccount(slackId: string) {
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
