import type { NextApiRequest, NextApiResponse } from "next";
import { getAllOpportunities } from "lib/airtable-import";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const opportunities = await getAllOpportunities();
  response.setHeader("Content-Type", "application/json");
  response.status(200).send(JSON.stringify(opportunities, null, 2));
}
