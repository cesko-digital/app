#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config
import { getSlackUser } from "~/src/slack/user";

async function main() {
  const { SLACK_SYNC_TOKEN = "" } = process.env;
  const [_, __, userId] = process.argv;
  const user = await getSlackUser(SLACK_SYNC_TOKEN, userId);
  console.log(JSON.stringify(user, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
