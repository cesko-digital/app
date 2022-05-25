import { NextApiRequest, NextApiResponse } from "next";

async function handler(request: NextApiRequest, response: NextApiResponse) {
  console.log("Executing /api/hello handler.");
  response.status(200).send("Hi!");
}

export default handler;
