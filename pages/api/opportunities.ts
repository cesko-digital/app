import { getDataSource } from "lib/site-data";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(request: NextApiRequest, response: NextApiResponse) {
  const opportunities = await getDataSource().opportunities();
  response.setHeader("Content-Type", "application/json");
  response.status(200).send(JSON.stringify(opportunities, null, 2));
}

export default handler;
