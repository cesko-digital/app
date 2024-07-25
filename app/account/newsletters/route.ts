import { NextResponse, type NextRequest } from "next/server";

import { boolean, record } from "typescript-json-decoder";

import { withAuthenticatedUser } from "~/src/auth";
import {
  getSubscriber,
  mainContactListId,
  subscribeToList,
  unsubscribeFromList,
} from "~/src/ecomail";

const apiKey = process.env.ECOMAIL_API_KEY ?? "";

/** Get main Ecomail contact list subscription status for signed-in user */
export async function GET() {
  return withAuthenticatedUser(async ({ email }) => {
    const subscriber = await getSubscriber(apiKey, email);
    const subscribed =
      subscriber.lists.find((list) => list.listId === mainContactListId)
        ?.state === "subscribed";
    return NextResponse.json({ subscribed });
  });
}

/** Set main Ecomail contact list subscription status for signed-in user */
export async function POST(request: NextRequest) {
  const decodePayload = record({
    subscribed: boolean,
  });
  return withAuthenticatedUser(async ({ email }) => {
    const { subscribed } = decodePayload(await request.json());
    if (subscribed) {
      await subscribeToList(apiKey, {
        skipConfirmation: true,
        email,
      });
      return new Response(null, { status: 204 });
    } else {
      await unsubscribeFromList(apiKey, email);
      return new Response(null, { status: 204 });
    }
  });
}
