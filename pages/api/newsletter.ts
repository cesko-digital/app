import { addPerformanceLogging } from "lib/apm";
import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

const API_KEY = process.env.ECOMAIL_API_KEY || "";
const API_URL = "https://api2.ecomailapp.cz/lists/2/subscribe";
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

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

  if (!EMAIL_REGEX.test(body.email)) {
    response.status(400).send("Invalid email");
    return;
  }

  const subscriptionData = JSON.stringify({
    subscriber_data: {
      email: body.email,
      tags: ["web-subscribe-form"],
    },
  });

  try {
    const ecoMailResponse = await fetch(API_URL, {
      method: "POST",
      body: subscriptionData,
      headers: {
        "key": API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!ecoMailResponse.ok) {
      response.status(500).send("Unexpected error");
      return;
    }

    response.status(200).send("User subscription was successful");
  } catch (error) {
    response.status(500).send("Unexpected error");
  }
};

export default addPerformanceLogging(handler);
