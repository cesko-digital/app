// app/stats/report/route.ts

import { type NextApiRequest, type NextApiResponse } from "next";

import { getMetricsForPreviousMonth } from "~/src/data/metrics";
import { sendDirectMessage } from "~/src/slack/message";
import {
  getMetricsNewsletterDetail,
  getMetricsNewsletterHeader,
} from "~/src/slack/metricsNewsletter";

const { SLACK_METRICS_TOKEN = "" } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const { user_id } = req.body;

      if (!user_id || typeof user_id !== "string") {
        return res.status(400).json({ error: "Invalid user ID provided" });
      }

      const metrics = await getMetricsForPreviousMonth();

      const result = await sendDirectMessage({
        token: SLACK_METRICS_TOKEN,
        user: user_id,
        text: "Nové metriky za poslední měsíc jsou právě tady! 📊🚀",
        blocks: getMetricsNewsletterHeader(metrics),
      });

      await sendDirectMessage({
        token: SLACK_METRICS_TOKEN,
        user: user_id,
        text: "Detail metrik za poslední měsíc",
        blocks: getMetricsNewsletterDetail(metrics),
        thread_ts: result.ts,
      });

      return res.status(204).end();
    } catch (error) {
      console.error("Error processing request:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
