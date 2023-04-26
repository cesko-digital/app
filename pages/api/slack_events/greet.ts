import { parseWelcomeMessages, sendWelcomeMessage } from "app/join/onboarding";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * This endpoint is called when our users type the `/pozdrav` slash command
 *
 * https://api.slack.com/interactivity/slash-commands
 */
async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { user_id, text } = request.body;
  if (user_id) {
    if (text.startsWith("day")) {
      const messages = parseWelcomeMessages();
      for (const [day, msg] of messages) {
        if (text === `day${day}.txt`) {
          await sendWelcomeMessage(user_id, msg);
        }
      }
    } else if (text) {
      await sendWelcomeMessage(user_id, decodeURIComponent(text));
    } else {
      await sendWelcomeMessage(user_id);
    }
  }
  response.status(204).end();
}

export default handler;
