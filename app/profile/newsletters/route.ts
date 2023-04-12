import { NextRequest, NextResponse } from "next/server";
import { getToken, JWT } from "next-auth/jwt";
import {
  decodeNewsletterPreferences,
  getNewsletterPreferences,
  setNewsletterPreferences,
} from "lib/ecomail";

const apiKey = process.env.ECOMAIL_API_KEY || "";

export async function GET(request: NextRequest) {
  return withAuthenticatedUser(request, async (token) => {
    const email = token.email!;
    const existingPrefs = await getNewsletterPreferences(apiKey, email);
    return NextResponse.json(existingPrefs);
  });
}

export async function POST(request: NextRequest) {
  return withAuthenticatedUser(request, async (token) => {
    const email = token.email!;
    const newPrefs = decodeNewsletterPreferences(await request.json());
    const success = await setNewsletterPreferences(apiKey, email, newPrefs);
    return success
      ? new Response(null, { status: 204 })
      : new Response("Failed to update subscriber prefs at Ecomail", {
          status: 500,
        });
  });
}

async function withAuthenticatedUser(
  request: NextRequest,
  action: (token: JWT) => Promise<Response>
): Promise<Response> {
  const token = await getToken({ req: request });
  if (!token || !token.sub) {
    return new Response("Authentication required", { status: 401 });
  } else {
    return await action(token);
  }
}
