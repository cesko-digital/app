import { getSlackUser, isRegularUser, sendDirectMessage } from "lib/slack/user";
import { upsertSlackUser } from "lib/airtable/slack-user";
import { join } from "path";
import fs from "fs";
import {
  getUserProfileByMail,
  updateUserProfile,
} from "lib/airtable/user-profile";

const { SLACK_SYNC_TOKEN = "", SLACK_GREET_BOT_TOKEN = "" } = process.env;

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

  // Ignore non-regular “users” such as apps
  if (!isRegularUser(slackUser)) {
    console.info(
      `Received Slack team_join event for non-regular user ${slackId}, ignoring`
    );
    return;
  }

  // Save the new Slack user to the Slack Users DB table.
  // This makes sense even if the following steps fail.
  const slackUserInDB = await upsertSlackUser({
    slackId: slackUser.id,
    name: slackUser.real_name || slackUser.name,
    email: slackUser.profile.email,
    slackAvatarUrl: slackUser.profile.image_512,
    userProfileRelationId: undefined,
  });

  // Without an e-mail address we can’t confirm the account
  const { email } = slackUser.profile;
  if (!email) {
    console.error(
      `Account confirmation failed, missing email addres for user ${slackId}`
    );
    return;
  }

  // Get the initial user profile we are trying to confirm
  const initialProfile = await getUserProfileByMail(email).catch(() => null);

  // The profile may not exist if the user skipped onboarding somehow
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
  await updateUserProfile(initialProfile.id, {
    slackUserRelationId: slackUserInDB.id,
    state: "confirmed",
  });
}

/**
 * Send welcome message to Slack user
 *
 * The message is read from `content/welcome.txt`, see formatting spec here:
 * <https://api.slack.com/reference/surfaces/formatting>. Unfortunately it’s not
 * regular Markdown, not even close.
 */
export async function sendWelcomeMessage(
  slackId: string,
  message: string | undefined = undefined
) {
  const contentFolder = join(process.cwd(), "content");
  const welcomeMessagePath = join(contentFolder, "welcome.txt");
  const defaultMessage = fs.readFileSync(welcomeMessagePath, "utf-8");
  await sendDirectMessage(
    SLACK_GREET_BOT_TOKEN,
    slackId,
    message || defaultMessage
  );
}
