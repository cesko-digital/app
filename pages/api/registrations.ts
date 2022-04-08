import { NextApiRequest, NextApiResponse } from "next";
import Airtable from "airtable";
import { addPerformanceLogging } from "lib/apm";

async function handler(request: NextApiRequest, response: NextApiResponse) {
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
    const registration = {
      fields: {
        Name: name,
        Email: email,
        Skills: skills,
      },
    };
    await base("Registrations").create([registration]);
    response.status(201).send("Registration created.");
  } catch (e) {
    response.status(500).send("Sorry :(");
  }
}

export default addPerformanceLogging(handler);
