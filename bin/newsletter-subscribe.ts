#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config

import { getAllUserProfiles } from "lib/airtable/user-profile";
import { addSubscribers } from "lib/ecomail";

/**
 * Subscribe all our users to the monthly newsletter
 *
 * This script downloads all confirmed users from the User Profiles table
 * and adds them as subscribers to our monthly newsletter. If user with given
 * e-mail already exists in the contact list we keep the record as is, ie.
 * we won’t resubscribe the user as an example.
 */
async function main() {
  console.log("Downloading all user profiles.");
  const userProfiles = await getAllUserProfiles();
  const confirmedUsers = userProfiles.filter(
    (user) => user.state === "confirmed"
  );
  console.log(
    `Successfully downloaded and parsed ${userProfiles.length} user profiles, ${confirmedUsers.length} confirmed.`
  );

  console.log(`Uploading ${confirmedUsers.length} addresses to Ecomail.`);
  await addSubscribers(
    process.env.ECOMAIL_API_KEY || "",
    confirmedUsers.map((user) => user.email)
  );
}

main().catch((e) => console.error(e));
