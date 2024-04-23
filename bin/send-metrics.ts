#!/usr/bin/env -S npx ts-node -r tsconfig-paths/register -r dotenv-flow/config
import { getMetricsForPreviousMonth } from "~/src/data/metrics";
import { sendDirectMessageToChannel } from "~/src/slack/message";
import {
  getMetricsNewsletterDetail,
  getMetricsNewsletterHeader,
} from "~/src/slack/metricsNewsletter";

const { SLACK_METRICS_TOKEN = "", METRICS_NEWSLETTER_CHANNEL_ID = "" } =
  process.env;

async function main() {
  const metrics = await getMetricsForPreviousMonth();
  const result = await sendDirectMessageToChannel({
    token: SLACK_METRICS_TOKEN,
    channel: METRICS_NEWSLETTER_CHANNEL_ID,
    text: "Nové metriky za poslední měsíc jsou právě tady! 📊🚀",
    blocks: getMetricsNewsletterHeader(metrics),
  });
  await sendDirectMessageToChannel({
    token: SLACK_METRICS_TOKEN,
    channel: METRICS_NEWSLETTER_CHANNEL_ID,
    text: "Detail metrik za poslední měsíc",
    blocks: getMetricsNewsletterDetail(metrics),
    thread_ts: result.ts,
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
