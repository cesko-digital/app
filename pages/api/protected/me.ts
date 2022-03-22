import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { decodeUserProfile } from "lib/user-profile";
import Airtable from "airtable";

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

  const apiKey = process.env.AIRTABLE_API_KEY;
  const base = new Airtable({ apiKey }).base("apppZX1QC3fl1RTBM")(
    "Profiles 2.0"
  );

  const { method } = request;

  try {
    switch (method) {
      case "GET":
        const userRecords = await base
          .select({
            filterByFormula: `{slackId} = "${token.sub}"`,
          })
          .all();
        if (userRecords.length === 0) {
          response.status(404).send("User not found");
          return;
        }
        const record = userRecords[0];
        const profile = decodeUserProfile({ id: record.id, ...record.fields });
        response.setHeader("Content-Type", "application/json");
        response.status(200).send(JSON.stringify(profile, null, 2));
        break;
      case "PATCH":
        const existingRecords = await base
          .select({ filterByFormula: `{slackId} = "${token.sub}"` })
          .all();
        if (existingRecords.length === 0) {
          response.status(404).send("User with given slackId not found");
          return;
        }
        const databaseId = existingRecords[0].id;
        const { name, email, skills } = request.body;
        await base.update(databaseId, { name, email, skills });
        response.status(200).send("Updated");
        break;
      default:
        response.setHeader("Allow", ["GET", "PATCH"]);
        response.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    console.error(e);
    response.status(500).send("Internal error, sorry!");
  }
}
