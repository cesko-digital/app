import { type NextRequest } from "next/server";

import { record } from "typescript-json-decoder";

import { decodeJSONString } from "~/src/decoding";
import { handleFollowupResponse } from "~/src/market-place";
import { decodeBlockActionCallback } from "~/src/slack/interactions";

const { SLACK_BAZAAR_BOT_TOKEN = "", SLACK_BAZAAR_CALLBACK_SECRET = "" } =
  process.env;

/** Handle Slack notifications about market-place responses */
export async function POST(request: NextRequest): Promise<Response> {
  // The payload is stored as a JSON string under a “payload” key in the body object
  const decodeCallbackEnvelope = record({
    payload: decodeJSONString(decodeBlockActionCallback),
  });
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const wrappedResponse = decodeCallbackEnvelope(await request.json());
    if (wrappedResponse.payload.token !== SLACK_BAZAAR_CALLBACK_SECRET) {
      return new Response("Request token does not match.", { status: 400 });
    }
    await handleFollowupResponse(
      SLACK_BAZAAR_BOT_TOKEN,
      wrappedResponse.payload,
    );
    return new Response("Acknowledged!", { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("Sorry :(", { status: 500 });
  }
}
