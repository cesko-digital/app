#!/usr/bin/env ts-node -r tsconfig-paths/register -r dotenv-flow/config

import { getAllUserProfiles } from "lib/airtable/user-profile";
import { addSubscribers } from "lib/ecomail";

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
