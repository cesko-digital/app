#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config
import { getUserProfileByMail } from "~/src/data/user-profile";
import { getMetricsNewsletter } from "~/src/metricsNewsletter";
import { sendDirectMessage } from "~/src/slack/message";

const { SLACK_METRICS_TOKEN = "" } = process.env;

async function main() {
  // Get all users that we want to send metrics to.
  // TODO: Replace with a real query for all users that want to receive metrics.
  const me = await getUserProfileByMail("jakubdrahosJD@seznam.cz");

  if (!me.slackId) {
    console.error(`No Slack ID found for user ${me.id}!`);
    return;
  }

  const blocks = await getMetricsNewsletter();

  // Send metrics to the selected users.
  await sendDirectMessage(
    SLACK_METRICS_TOKEN,
    me.slackId,
    "Nové metriky za poslední měsíc jsou právě tady! 📊🚀",
    blocks,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
