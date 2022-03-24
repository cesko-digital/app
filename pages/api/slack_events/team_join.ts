import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { type } = request.body;
  switch (type) {
    case "url_verification":
      const { challenge } = request.body;
      response.status(200).send(challenge);
      return;
    default:
      response.status(400).send("Don’t understand");
  }
}
