import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import {
  decodeNewsletterPreferences,
  getNewsletterPreferences,
  setNewsletterPreferences,
} from "lib/ecomail";

/** Get/set newsletter preferences for signed-in user */
async function handler(request: NextApiRequest, response: NextApiResponse) {
  const token = await getToken({ req: request });
  if (!token) {
    response.status(401).send("Auth token missing");
    return;
  }

  const { method } = request;
  const apiKey = process.env.ECOMAIL_API_KEY || "";
  const email = token.email!;

  try {
    switch (method) {
      case "GET":
        const existingPrefs = await getNewsletterPreferences(apiKey, email);
        response.setHeader("Content-Type", "application/json");
        response.status(200).send(JSON.stringify(existingPrefs, null, 2));
        break;
      case "POST":
        const newPrefs = decodeNewsletterPreferences(request.body);
        await setNewsletterPreferences(apiKey, email, newPrefs);
        response.status(204).end();
        break;
      default:
        response.setHeader("Allow", ["GET", "POST"]);
        response.status(405).end(`Method ${method} not allowed`);
    }
  } catch (e) {
    console.error(e);
    response.status(500).send("Internal error, sorry!");
  }
}

export default handler;
