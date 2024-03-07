import { NextResponse, type NextRequest } from "next/server";

import { withAuthenticatedUser } from "~/src/auth";
import {
  decodeNewsletterPreferences,
  getNewsletterPreferences,
  setNewsletterPreferences,
} from "~/src/ecomail";

const apiKey = process.env.ECOMAIL_API_KEY ?? "";

// TBD: This should be Slack e-mail.
export async function GET() {
  return withAuthenticatedUser(async ({ email }) => {
    const existingPrefs = await getNewsletterPreferences(apiKey, email);
    return NextResponse.json(existingPrefs);
  });
}

export async function POST(request: NextRequest) {
  return withAuthenticatedUser(async ({ email }) => {
    const newPrefs = decodeNewsletterPreferences(await request.json());
    const success = await setNewsletterPreferences(apiKey, email, newPrefs);
    return success
      ? new Response(null, { status: 204 })
      : new Response("Failed to update subscriber prefs at Ecomail", {
          status: 500,
        });
  });
}
