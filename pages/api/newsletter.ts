import { mainContactListId, subscribeToList } from "lib/ecomail";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  const { body } = request;

  if (request.method !== "POST") {
    response.status(400).send("Cannot GET newsletter API, use POST instead");
    return;
  }

  if (!body || !body.email) {
    response.status(400).send("Email is a required parameter");
    return;
  }

  try {
    const success = await subscribeToList(
      process.env.ECOMAIL_API_KEY || "",
      body.email,
      mainContactListId,
      ["web-subscribe-form"]
    );
    if (!success) {
      response.status(500).send("Unexpected error");
      return;
    }
    response.status(200).send("User subscription was successful");
  } catch (error) {
    response.status(500).send("Unexpected error");
  }
};

export default handler;
