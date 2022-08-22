#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config

import { getAllVolunteers } from "lib/airtable/volunteers";
import {
  getAllUserProfiles,
  updateUserProfile,
} from "lib/airtable/user-profile";

async function main() {
  console.log(`Downloading original volunteer records.`);
  const volunteers = await getAllVolunteers();
  console.log(`Success, downloaded ${volunteers.length} records.`);
  console.log(`Downloading current user profiles.`);
  const userProfiles = await getAllUserProfiles();
  console.log(
    `Success, downloaded ${userProfiles.length} records. Pairing data:`
  );
  for (const userProfile of userProfiles) {
    const originalRecord = volunteers.find(
      (v) => v.slackId === userProfile.slackId
    );
    if (!originalRecord) {
      console.log(
        `Original record for Slack ID ${userProfile.slackId} not found, skipping.`
      );
      continue;
    }
    if (originalRecord.createdAt === userProfile.createdAt) {
      console.log(
        `Creation timestamp for Slack ID ${userProfile.slackId} matches, no change needed.`
      );
      continue;
    }
    try {
      const { createdAt } = originalRecord;
      await updateUserProfile(userProfile.id, { createdAt });
      console.log(
        `Successfully update ${userProfile.slackId} to timestamp ${createdAt}`
      );
    } catch (error) {
      console.error(`Error updating ${userProfile.slackId}: ${error}`);
    }
  }
}

main().catch((e) => console.error(e));
