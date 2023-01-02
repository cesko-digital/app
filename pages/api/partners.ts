import { NextApiRequest, NextApiResponse } from "next";
import { siteData } from "lib/site-data";

async function handler(request: NextApiRequest, response: NextApiResponse) {
  response.setHeader("Content-Type", "application/json");
  response.status(200).send(JSON.stringify(siteData.partners, null, 2));
}

export default handler;
