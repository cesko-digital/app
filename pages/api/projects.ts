import { getDataSource } from "lib/site-data";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(request: NextApiRequest, response: NextApiResponse) {
  const projects = await getDataSource().projects();
  response.setHeader("Content-Type", "application/json");
  response.status(200).send(JSON.stringify(projects, null, 2));
}

export default handler;
