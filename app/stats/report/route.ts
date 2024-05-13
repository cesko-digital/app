import { type NextRequest } from "next/server";
import { sendDirectMessage } from "~/src/slack/message";
import { getMetricsNewsletterHeader, getMetricsNewsletterDetail } from "~/src/slack/metricsNewsletter";
import { getMetricsForPreviousMonth } from "~/src/data/metrics";

/**
 * This endpoint is called when our users type the `/metriky` slash command
 *
 * https://api.slack.com/interactivity/slash-commands
 */

const { SLACK_METRICS_TOKEN = "" } = process.env;

export async function POST(request: NextRequest): Promise<Response> {
  const formData = await request.formData();
  const user_id = formData.get("user_id");  
  const metrics = await getMetricsForPreviousMonth();

  if (user_id && typeof user_id !== "string") {
    return new Response(null, { status: 400 });
  }
 
  if (user_id) {   
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
         })}
  

  return new Response(null, { status: 204 });
}

