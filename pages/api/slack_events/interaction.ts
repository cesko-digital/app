import { NextApiRequest, NextApiResponse } from "next";
import { record } from "typescript-json-decoder";
import { decodeJSONString } from "lib/decoding";
import { decodeBlockActionCallback } from "lib/slack/interactions";
import { handleFollowupResponse } from "lib/market-place";

const { SLACK_BAZAAR_BOT_TOKEN = "" } = process.env;

// TBD: Verify authenticity
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
