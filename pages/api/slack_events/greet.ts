import { sendWelcomeMessage } from "lib/onboarding";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * This endpoint is called when our users type the `/pozdrav` slash command
 *
 * https://api.slack.com/interactivity/slash-commands
 */
async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { user_id } = request.body;
  if (user_id) {
    await sendWelcomeMessage(user_id);
  }
  response.status(204).end();
}

export default handler;
