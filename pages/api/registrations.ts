import { NextApiRequest, NextApiResponse } from "next";
import Airtable from "airtable";

/** Create a new, unconfirmed user profile */
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
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
    const base = new Airtable({ apiKey }).base("apppZX1QC3fl1RTBM")(
      "Profiles 2.0"
    );

    // Make sure the email doesn’t exist already
    const previousRecords = await base
      .select({
        filterByFormula: `{email} = "${email}"`,
      })
      .all();
    if (previousRecords.length != 0) {
      const msg = "Email already exists";
      console.error(msg);
      response.status(401).send(msg);
      return;
    }

    const state = "unconfirmed";
    const registration = {
      fields: {
        name,
        email,
        skills,
        state,
      },
    };
    await base.create([registration]);
    response.status(201).send("Registration created.");
  } catch (e) {
    console.error(e);
    response.status(500).send("Sorry :(");
  }
}
