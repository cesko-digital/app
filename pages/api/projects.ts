import type { NextApiRequest, NextApiResponse } from "next";
import { getAllProjects } from "lib/airtable-import";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const projects = await getAllProjects();
  response.setHeader("Content-Type", "application/json");
  response.status(200).send(JSON.stringify(projects, null, 2));
}
