import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { assert } from "console";
import { getSlackUserBySlackId } from "lib/airtable/slack-user";
import {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
} from "lib/airtable/user-profile";

/**
 * Retrieve or update user profile
 *
 * **BEWARE:** All we can trust for user identification is the JWT
 * session token. Anything else may be spoofed by the user.
 *
 * If the user is trying to GET a user profile that does not exist yet,
 * we may safely create the confirmed profile on the fly, since everything
 * that’s needed to create and confirm the profile is already in the
 * session token.
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

  const slackId = token.sub!;
  assert(slackId, "Slack ID missing in JWT token.");

  try {
    let profile = await getUserProfile(slackId).catch(() => null);
    const { method } = request;
    switch (method) {
      case "GET":
        if (!profile) {
          // The profile doesn’t exist yet, let’s create it now
          const slackUser = await getSlackUserBySlackId(slackId);
          profile = await createUserProfile({
            name: slackUser.name,
            email: slackUser.email!,
            skills: [],
            state: "confirmed",
            slackUserRelationId: slackUser.id,
            createdAt: new Date().toISOString(),
          });
        }
        response.setHeader("Content-Type", "application/json");
        response.status(200).send(JSON.stringify(profile, null, 2));
        break;
      case "PATCH":
        if (!profile) {
          response.status(404).send("User profile not found.");
          return;
        }
        // Make sure we do NOT include the `slackId` field nor `state` here
        const { name, skills } = request.body;
        await updateUserProfile(profile.id, { name, skills });
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
