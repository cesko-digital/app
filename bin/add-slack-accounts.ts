#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config
import { linkAccount } from "~/src/data/auth";
import { getAllUserProfiles } from "~/src/data/user-profile";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const toJSON = (val: any) => JSON.stringify(val, null, 2);

async function main() {
  console.log("Downloading user profiles.");
  const userProfiles = await getAllUserProfiles("Missing Slack Account");
  for (const user of userProfiles) {
    if (!user.slackId) {
      console.log("User missing Slack ID, skipping: ", user.email);
      continue;
    }
    console.log("Linking account for: ", user.email);
    await linkAccount({
      userId: user.id,
      providerAccountId: user.slackId,
      provider: "slack",
      type: "oauth",
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

export {};
