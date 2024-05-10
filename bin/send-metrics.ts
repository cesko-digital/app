#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config
import { getMetricsForPreviousMonth } from "~/src/data/metrics";
import { sendDirectMessageToChannel } from "~/src/slack/message";
import {
  getMetricsNewsletterDetail,
  getMetricsNewsletterHeader,
} from "~/src/slack/metricsNewsletter";

const { SLACK_METRICS_TOKEN = "" } = process.env;
const coreTeamChannelId = "CSXGU7F0F";

async function main() {
  const [_, __, channel = coreTeamChannelId] = process.argv;
  const metrics = await getMetricsForPreviousMonth();
  const result = await sendDirectMessageToChannel({
    token: SLACK_METRICS_TOKEN,
    text: "Nové metriky za poslední měsíc jsou právě tady! 📊🚀",
    blocks: getMetricsNewsletterHeader(metrics),
    channel,
  });
  await sendDirectMessageToChannel({
    token: SLACK_METRICS_TOKEN,
    text: "Detail metrik za poslední měsíc",
    blocks: getMetricsNewsletterDetail(metrics),
    thread_ts: result.ts,
    channel,
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
