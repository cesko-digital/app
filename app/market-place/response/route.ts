import { type NextRequest } from "next/server";

import { handleFollowupResponse } from "~/src/market-place";
import { decodeBlockActionCallback } from "~/src/slack/interactions";

const { SLACK_BAZAAR_BOT_TOKEN = "", SLACK_BAZAAR_CALLBACK_SECRET = "" } =
  process.env;

/**
 * Handle Slack notifications about market-place responses
 *
 * The response format is a bit bizzare – the response body contains
 * form data with a single key, `payload`, that contains a JSON string
 * of the actual JSON response.
 */
export async function POST(request: NextRequest): Promise<Response> {
  try {
    const formData = await request.formData();
    const payload = formData.get("payload");
    if (!payload || typeof payload !== "string") {
      return new Response("Payload missing or invalid", { status: 400 });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const wrappedResponse = decodeBlockActionCallback(JSON.parse(payload));
    if (wrappedResponse.token !== SLACK_BAZAAR_CALLBACK_SECRET) {
      return new Response("Request token does not match.", { status: 400 });
    }
    await handleFollowupResponse(SLACK_BAZAAR_BOT_TOKEN, wrappedResponse);
    return new Response("Acknowledged!", { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("Sorry :(", { status: 500 });
  }
}
