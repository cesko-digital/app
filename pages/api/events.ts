import { dataSource } from "lib/data-source";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const events = await dataSource.getAllEvents();
  response.setHeader("Content-Type", "application/json");
  response.status(200).send(JSON.stringify(events, null, 2));
}
