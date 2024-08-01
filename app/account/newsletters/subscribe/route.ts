import { NextResponse, type NextRequest } from "next/server";

import { record, string } from "typescript-json-decoder";

import { subscribeToList } from "~/src/ecomail";

const headers = {
  "Allow": "OPTIONS, POST",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
};

export async function POST(request: NextRequest): Promise<Response> {
  const decodeRequest = record({
    email: string,
  });
  try {
    const { email } = decodeRequest(await request.json());
    const success = await subscribeToList(process.env.ECOMAIL_API_KEY ?? "", {
      email: email,
      tags: ["web-subscribe-form"],
      groups: ["číst.digital"],
    });
    if (!success) {
      throw "Unexpected error";
    }
    return NextResponse.json(
      { message: "User subscription was successful" },
      {
        status: 200,
        headers,
      },
    );
  } catch {
    return new Response("Unexpected error", { status: 500 });
  }
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, {
    status: 200,
    headers,
  });
}
