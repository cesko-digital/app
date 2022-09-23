import { NextApiRequest, NextApiResponse } from "next";
import { record } from "typescript-json-decoder";
import { decodeJSONString } from "lib/decoding";
import { decodeBlockActionCallback } from "lib/slack/interactions";
import { handleFollowupResponse } from "lib/market-place";

const { SLACK_BAZAAR_BOT_TOKEN = "", SLACK_BAZAAR_CALLBACK_SECRET = "" } =
  process.env;

/** Handle Slack notifications about market-place responses */
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // The payload is stored as a JSON string under a “payload” key in the body object
  const decodeCallbackEnvelope = record({
    payload: decodeJSONString(decodeBlockActionCallback),
  });
  try {
    const wrappedResponse = decodeCallbackEnvelope(request.body);
    if (wrappedResponse.payload.token !== SLACK_BAZAAR_CALLBACK_SECRET) {
      response.status(400).send("Request token does not match.");
      return;
    }
    await handleFollowupResponse(
      SLACK_BAZAAR_BOT_TOKEN,
      wrappedResponse.payload
    );
    response.status(200).send("Acknowledged!");
  } catch (e) {
    console.error(e);
    response.status(500).send("Sorry :(");
  }
}
