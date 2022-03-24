import { decodeIncomingMessage } from "lib/slack/events";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const msg = decodeIncomingMessage(request.body);
    switch (msg.type) {
      case "url_verification":
        response.status(200).send(msg.challenge);
        return;
      case "event_callback":
        console.log(JSON.stringify(request.body), null, 2);
        response.status(204);
        return;
    }
  } catch (e) {
    console.log(e);
    response.status(400).send("Don’t understand");
  }
}
