#!/usr/bin/env ts-node -r tsconfig-paths/register -r dotenv-flow/config

import { getAllSlackUsers } from "lib/airtable/slack-user";
import { getAllVolunteers } from "lib/airtable/volunteers";
import {
  createUserProfile,
  getUserProfileByMail,
  UserProfile,
} from "lib/airtable/user-profile";

async function main() {
  // Download all Volunteers from the legacy table
  console.log(`Downloading all records from the Volunteers table.`);
  const volunteers = await getAllVolunteers();
  console.log(
    `Successfully downloaded and parsed ${volunteers.length} records.`
  );

  // Download all Slack Users from the new table
  console.log(`Downloading all records from the Slack Users table.`);
  const slackUsers = await getAllSlackUsers();
  console.log(
    `Successfully downloaded and parsed ${slackUsers.length} records.`
  );

  // Now create or update user info in the new User Profiles table
  // and pair the user profiles to appropriate Slack Users.
  type User = Pick<
    UserProfile,
    "name" | "email" | "skills" | "slackUserRelationId" | "state"
  >;
  let userProfiles: User[] = [];
  console.log("Pairing user data.");
  for (const slackUser of slackUsers) {
    const volunteer = volunteers.find(
      (candidate) => candidate.slackId === slackUser.slackId
    );
    if (!volunteer) {
      console.log(`Volunteer not found for Slack user ${slackUser.slackId}`);
      continue;
    }
    userProfiles.push({
      email: volunteer.email,
      name: slackUser.name,
      skills: volunteer.skillIds,
      slackUserRelationId: slackUser.id,
      state: "confirmed",
    });
  }

  console.log("Updating the User Profiles table.");
  for (const profile of userProfiles) {
    const existingProfile = await getUserProfileByMail(profile.email).catch(
      () => null
    );
    if (!existingProfile) {
      console.log(`User profile for ${profile.email} not found, creating.`);
      await createUserProfile(profile);
    } else {
      console.log(
        `User profile for ${profile.email} already exists, skipping.`
      );
    }
  }
}

main().catch((e) => console.error(e));
