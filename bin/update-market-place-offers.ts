#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config
import {
  markExpiredOffers,
  notifyOwnersAboutPublishedOffers,
  triggerFollowupQuestions,
} from "~/src/market-place";

async function main() {
  const { SLACK_BAZAAR_BOT_TOKEN = "" } = process.env;
  await markExpiredOffers(SLACK_BAZAAR_BOT_TOKEN);
  await triggerFollowupQuestions(SLACK_BAZAAR_BOT_TOKEN);
  await notifyOwnersAboutPublishedOffers(SLACK_BAZAAR_BOT_TOKEN);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
