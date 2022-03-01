import { loadAllSkills } from "lib/skills";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const results = await loadAllSkills();
  response.setHeader("Content-Type", "application/json");
  response.status(200).send(JSON.stringify(results, null, 2));
}
