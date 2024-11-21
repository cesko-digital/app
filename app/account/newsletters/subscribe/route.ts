import { NextResponse, type NextRequest } from "next/server";

import { record, string } from "typescript-json-decoder";

import { subscribeToList } from "~/src/ecomail";

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
  const decodeRequest = record({
    email: string,
  });
  const { email } = await request
    .json()
    .then(decodeRequest)
    .catch(() => ({ email: null }));
  if (!email) {
    return new Response("Email field missing", { status: 400 });
  }
  const success = await subscribeToList(process.env.ECOMAIL_API_KEY ?? "", {
    email: email,
    tags: ["web-subscribe-form"],
  });
  if (!success) {
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

// The OPTION method support is needed by Webflow
export async function OPTIONS(): Promise<Response> {
  return new Response(null, {
    status: 200,
    headers,
  });
}
