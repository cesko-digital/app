import type { NextApiRequest, NextApiResponse } from "next";
import { getAllEvents } from "lib/airtable-import";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const events = await getAllEvents();
  response.setHeader("Content-Type", "application/json");
  response.status(200).send(JSON.stringify(events, null, 2));
}
