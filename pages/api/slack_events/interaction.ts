import { NextApiRequest, NextApiResponse } from "next";
import { record } from "typescript-json-decoder";
import {
  decodeBlockActionCallback,
  InteractionResponse,
} from "lib/slack/interactions";

const { SLACK_SYNC_TOKEN = "" } = process.env;

/** Receive Slack notification about new messages and pass them to other processes such as market-place */
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const decodeCallbackEnvelope = record({
    payload: decodeBlockActionCallback,
  });

  try {
    const msg = decodeCallbackEnvelope(request.body).payload;
    const reply: InteractionResponse = {
      text: `Vybraná odpověď: ${msg.actions[0].value}.`,
    };
    await fetch(msg.response_url, {
      method: "POST",
      body: JSON.stringify(reply),
    });
    response.status(200).send("Acknowledged!");
  } catch (e) {
    console.error(e);
    response.status(500).send("Sorry :(");
  }
}
