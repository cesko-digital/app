import { type NextRequest } from "next/server";

import { record, string } from "typescript-json-decoder";

import { subscribeToList } from "~/src/ecomail";

export async function POST(request: NextRequest): Promise<Response> {
  const decodeRequest = record({
    email: string,
  });
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const { email } = decodeRequest(await request.json());
    const success = await subscribeToList(process.env.ECOMAIL_API_KEY ?? "", {
      email: email,
      tags: ["web-subscribe-form"],
      groups: ["číst.digital"],
    });
    if (!success) {
      throw "Unexpected error";
    }
    return new Response("User subscription was successful", { status: 200 });
  } catch {
    return new Response("Unexpected error", { status: 500 });
  }
}
