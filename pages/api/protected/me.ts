import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { send } from "lib/airtable-request";
import { assert } from "console";
import Airtable from "airtable";
import {
  getUserProfile,
  updateUserProfile,
  userProfileTable,
} from "lib/user-profile";

/**
 * Retrieve or update user profile
 *
 * BEWARE: All we can trust for user identification is the JWT
 * session token. Anything else may be spoofed by the user.
 */
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const token = await getToken({ req: request });
  if (!token) {
    response.status(401).send("Auth token missing");
    return;
  }

  assert(token.sub, "Slack ID missing in JWT token.");

  const apiKey = process.env.AIRTABLE_API_KEY;
  const base = new Airtable({ apiKey }).base("apppZX1QC3fl1RTBM");
  const table = userProfileTable(base);

  try {
    const profile = await send(table, getUserProfile(token.sub!));
    if (!profile) {
      response.status(404).send("User not found");
      return;
    }

    const { method } = request;

    switch (method) {
      case "GET":
        response.setHeader("Content-Type", "application/json");
        response.status(200).send(JSON.stringify(profile, null, 2));
        break;
      case "PATCH":
        // Make sure we do NOT include the `slackId` field nor `state` here
        const { name, email, skills } = request.body;
        await send(
          table,
          updateUserProfile(profile.id, { name, email, skills })
        );
        response.status(200).send("Updated");
        break;
      default:
        response.setHeader("Allow", ["GET", "PATCH"]);
        response.status(405).end(`Method ${method} not allowed`);
    }
  } catch (e) {
    console.error(e);
    response.status(500).send("Internal error, sorry!");
  }
}
