import { getDataSource } from "lib/site-data";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(request: NextApiRequest, response: NextApiResponse) {
  const users = await getDataSource().users();
  response.setHeader("Content-Type", "application/json");
  response.status(200).send(JSON.stringify(users, null, 2));
}

export default handler;
