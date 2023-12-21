import { NextResponse, type NextRequest } from "next/server";

import {
  decodeNewsletterPreferences,
  getNewsletterPreferences,
  setNewsletterPreferences,
} from "~/src/ecomail";
import { withAuthenticatedUser } from "~/src/utils";

const apiKey = process.env.ECOMAIL_API_KEY ?? "";

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
