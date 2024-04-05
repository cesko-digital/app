import { type NextRequest } from "next/server";

import { parseWelcomeMessages, sendWelcomeMessage } from "~/src/onboarding";

/**
 * This endpoint is called when our users type the `/pozdrav` slash command
 *
 * https://api.slack.com/interactivity/slash-commands
 */
export async function POST(request: NextRequest): Promise<Response> {
  const formData = await request.formData();
  const user_id = formData.get("user_id");
  const text = formData.get("text");

  if (user_id && typeof user_id !== "string") {
    return new Response(null, { status: 400 });
  }
  if (text && typeof text !== "string") {
    return new Response(null, { status: 400 });
  }

  if (user_id) {
    if (text?.startsWith("day")) {
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

  return new Response(null, { status: 204 });
}
