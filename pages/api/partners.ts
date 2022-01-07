import type { NextApiRequest, NextApiResponse } from "next";
import { siteData } from "lib/site-data";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  response.setHeader("Content-Type", "application/json");
  response.status(200).send(JSON.stringify(siteData.partners, null, 2));
}
