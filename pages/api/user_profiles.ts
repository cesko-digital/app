import { NextApiRequest, NextApiResponse } from "next";
import { optional, record, string } from "typescript-json-decoder";
import { addPerformanceLogging } from "lib/apm";
import {
  createUserProfile,
  getUserProfileByMail,
} from "lib/airtable/user-profile";

const decodeRequest = record({
  name: string,
  email: string,
  skills: string,
  occupation: optional(string),
  organizationName: optional(string),
  profileUrl: optional(string),
});

/** Create a new, unconfirmed user profile */
async function handler(request: NextApiRequest, response: NextApiResponse) {
  try {
    const payload = decodeRequest(request.body);
    const { email } = payload;
    const previousProfile = await getUserProfileByMail(email).catch(() => null);
    if (previousProfile) {
      const msg = "Email already exists";
      console.error(msg);
      response.status(401).send(msg);
    } else {
      await createUserProfile({
        ...payload,
        skills: [],
        competencies: payload.skills,
        state: "unconfirmed",
        slackUserRelationId: undefined,
        createdAt: new Date().toISOString(),
      });
      response.status(201).send("User profile created.");
    }
  } catch (e) {
    console.error(e);
    response.status(500).send("Sorry :(");
  }
}

export default addPerformanceLogging(handler);
