#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config

import { getAllUserProfiles, UserProfile } from "lib/airtable/user-profile";
import { parseWelcomeMessages, sendWelcomeMessage } from "lib/onboarding";

/**
 * Maximum number of recipients
 *
 * This is a simple sanity check to make sure we don’t message everyone in
 * our Slack workspace by mistake.
 */
const maxUserCount = 50;

async function sendWelcomeMessages() {
  console.log("Downloading all user profiles, this may take a while.");
  const allUsers = (await getAllUserProfiles())
    // Only message users that have already joined Slack
    .filter((user) => user.state === "confirmed")
    // Make double sure we have those Slack IDs to message
    .filter((user) => !!user.slackId);
  for (const [day, message] of parseWelcomeMessages()) {
    if (day === 0) {
      // Zero-day welcome is sent directly after the user joins Slack
      continue;
    }
    // Filter out users that have just joined `day` days ago
    const recipients = allUsers.filter((u) => u.daysSinceRegistered === day);
    console.log(
      `Found ${recipients.length} users that have joined exactly ${day} days ago.`
    );
    // Sanity check
    if (recipients.length > maxUserCount) {
      console.error(
        "The number of recipients seems too high, refusing to message that many people."
      );
      continue;
    }
    // Send messages
    for (const recipient of recipients) {
      if (qualifiesForWelcomeMessages(recipient)) {
        console.debug(
          `Sending message for day #${day} to user ${recipient.slackId}.`
        );
        sendWelcomeMessage(recipient.slackId!, message);
      } else {
        console.debug(
          `Skipping ${recipient.slackId}, user too old to qualify (joined at ${recipient.createdAt}).`
        );
      }
    }
  }
}

/**
 * Is user profile new enough to receive the welcome messages?
 *
 * We want to make sure everyone either receives the full welcome sequence
 * or no messages at all.
 */
function qualifiesForWelcomeMessages(user: UserProfile): boolean {
  if (user.createdAt) {
    const creationDate = new Date(user.createdAt);
    const featureLaunchDate = new Date(2023, 0, 16);
    return creationDate > featureLaunchDate;
  } else {
    return false;
  }
}

sendWelcomeMessages().catch((error) => console.log(error));
