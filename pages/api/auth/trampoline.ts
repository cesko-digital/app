import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  response.setHeader("Content-type", "application/json");
  response
    .status(200)
    .send(
      JSON.stringify({ body: request.body, query: request.query }, null, 2)
    );
}
