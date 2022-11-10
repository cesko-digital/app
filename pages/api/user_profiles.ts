import { NextApiRequest, NextApiResponse } from "next";
import { addPerformanceLogging } from "lib/apm";
import {
  createUserProfile,
  getUserProfileByMail,
} from "lib/airtable/user-profile";

/** Create a new, unconfirmed user profile */
async function handler(request: NextApiRequest, response: NextApiResponse) {
  // Validate input
  // TBD: Update to a regular decoder
  const { name, email, skills } = request.body;
  const { occupation, organizationName, profileUrl } = request.body;
  if (!name) {
    response.status(400).send("Missing “name” param.");
    return;
  }
  if (!email) {
    response.status(400).send("Missing “email” param.");
    return;
  }
  if (!skills) {
    response.status(400).send("Missing “skills” param.");
    return;
  }
  try {
    const previousProfile = await getUserProfileByMail(email).catch(() => null);
    if (previousProfile) {
      const msg = "Email already exists";
      console.error(msg);
      response.status(401).send(msg);
    } else {
      await createUserProfile({
        name,
        email,
        skills: [],
        occupation,
        organizationName,
        profileUrl,
        competencies: skills,
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
