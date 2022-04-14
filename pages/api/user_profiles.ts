import { NextApiRequest, NextApiResponse } from "next";
import { addPerformanceLogging } from "lib/apm";
import { send } from "lib/airtable/request";
import Airtable from "airtable";
import {
  createUserProfile,
  getUserProfileByMail,
  userProfileTable,
} from "lib/airtable/user-profile";

/** Create a new, unconfirmed user profile */
async function handler(request: NextApiRequest, response: NextApiResponse) {
  // Validate input
  const { name, email, skills } = request.body;
  if (!name) {
    response.status(400).send("Missing “name” param.");
    return;
  }
  if (!email) {
    response.status(400).send("Missing “email” param.");
    return;
  }
  if (!skills || !Array.isArray(skills)) {
    response.status(400).send("The “skills” param is missing or invalid.");
    return;
  }
  try {
    const apiKey = process.env.AIRTABLE_API_KEY;
    const base = new Airtable({ apiKey }).base("apppZX1QC3fl1RTBM");
    const previousProfile = await send(
      userProfileTable(base),
      getUserProfileByMail(email)
    );
    if (previousProfile) {
      const msg = "Email already exists";
      console.error(msg);
      response.status(401).send(msg);
    } else {
      await send(
        userProfileTable(base),
        createUserProfile({
          name,
          email,
          skills,
        })
      );
      response.status(201).send("User profile created.");
    }
  } catch (e) {
    console.error(e);
    response.status(500).send("Sorry :(");
  }
}

export default addPerformanceLogging(handler);
