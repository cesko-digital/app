import type { NextApiRequest, NextApiResponse } from "next";
import { getAllUsers } from "lib/airtable-import";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const users = await getAllUsers();
  response.setHeader("Content-Type", "application/json");
  response.status(200).send(JSON.stringify(users, null, 2));
}
