import { sendWelcomeMessage } from "lib/onboarding";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { user_id } = request.body;
  if (user_id) {
    await sendWelcomeMessage(user_id);
  }
  response.status(204).end();
}

export default handler;
