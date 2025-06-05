import { NextResponse, type NextRequest } from "next/server";

import { literal, optional, record, string } from "typescript-json-decoder";

import { subscribeToList } from "~/src/ecomail/ecomail";

// The extra headers are here so that the endpoint works with Webflow
const headers = {
  "Allow": "OPTIONS, POST",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
};

/**
 * Add an e-mail address to our main contact list in Ecomail
 *
 * This is used by “external” systems such as the footer on our main website.
 */
export async function POST(request: NextRequest): Promise<Response> {
  //
  // Decode form data
  //
  const decodeRequest = record({
    acceptTerms: optional(literal("on")),
    email: string,
  });

  const requestData = await request
    .json()
    .then(decodeRequest)
    .catch(() => null);

  if (!requestData) {
    return new Response("Request invalid", { status: 400 });
  }

  if (requestData.acceptTerms === "on") {
    console.info("Bot subscribe detected, ignoring.");
    return new Response("User subscription was successful, LOL", {
      status: 200,
      headers,
    });
  }

  //
  // Add new subscriber to Ecomail
  //
  try {
    await subscribeToList({
      apiKey: process.env.ECOMAIL_API_KEY ?? "",
      email: requestData.email,
      tags: ["web-subscribe-form"],
    });
  } catch {
    return new Response("Failed to create Ecomail subscription", {
      status: 500,
    });
  }

  return NextResponse.json(
    { message: "User subscription was successful" },
    {
      status: 200,
      headers,
    },
  );
}

// The OPTIONS method support is needed by Webflow
export async function OPTIONS(): Promise<Response> {
  return new Response(null, {
    status: 200,
    headers,
  });
}
