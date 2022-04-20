import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { assert } from "console";
import { getUserProfile, updateUserProfile } from "lib/airtable/user-profile";

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

  try {
    const profile = await getUserProfile(token.sub!).catch(() => null);
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
        await updateUserProfile(profile.id, { name, email, skills });
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
