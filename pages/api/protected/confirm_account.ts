import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { send } from "lib/airtable/request";
import { getSlackUserBySlackId } from "lib/airtable/slack-user";
import Airtable from "airtable";
import {
  getUserProfileByMail,
  updateUserProfile,
  userProfileTable,
} from "lib/airtable/user-profile";

/**
 * “Manually” confirm a new account
 *
 * Accounts should be confirmed by another process as soon as the user
 * signs in to Slack for the first time, so this is a backup plan if the
 * plan A doesn’t work for whatever reason.
 */
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const token = await getToken({ req: request });
  if (!token) {
    response.status(401).end("Auth token missing");
    return;
  }

  if (request.method !== "POST") {
    response.setHeader("Allow", ["POST"]);
    response.status(405).end(`Method ${request.method} not allowed`);
    return;
  }

  const { email, sub } = token;
  if (!email || !sub) {
    response.status(400).end("Required parameters missing");
    return;
  }

  const apiKey = process.env.AIRTABLE_API_KEY;
  const base = new Airtable({ apiKey }).base("apppZX1QC3fl1RTBM");

  try {
    const profile = await send(
      userProfileTable(base),
      getUserProfileByMail(token.email!)
    );
    if (!profile) {
      response.status(404).send("User profile not found");
      return;
    }

    const slackUser = await getSlackUserBySlackId(token.sub!);
    const updatedProfile = await send(
      userProfileTable(base),
      updateUserProfile(profile.id, {
        slackUserRelationId: slackUser.id,
        state: "confirmed",
      })
    );

    response.setHeader("Content-Type", "application/json");
    response.status(200).send(JSON.stringify(updatedProfile, null, 2));
  } catch (e) {
    console.error(e);
    response.status(500).end("Internal error, sorry!");
  }
}
