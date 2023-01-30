import { getDataSource } from "lib/site-data";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(request: NextApiRequest, response: NextApiResponse) {
  const events = await getDataSource().events();
  response.setHeader("Content-Type", "application/json");
  response.status(200).send(JSON.stringify(events, null, 2));
}

export default handler;
