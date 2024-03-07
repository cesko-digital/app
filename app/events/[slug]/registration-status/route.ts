import { NextResponse, type NextRequest } from "next/server";

import { appBase } from "src/data/airtable";
import { eventsTable, findEventsWithSlug, type Event } from "src/data/event";
import { boolean, record } from "typescript-json-decoder";

import { withAuthenticatedUser } from "~/src/auth";

type Props = {
  params: {
    slug: string;
  };
};

/** Get registration status for event and signed-in user */
export async function GET(
  _: NextRequest,
  { params }: Props,
): Promise<Response> {
  return withAuthenticatedUser((user) => {
    const { slug } = params;
    return withEvent(slug, async (event) => {
      const registered = event.registeredUserSlackIds.includes(user.slackId);
      return NextResponse.json({ registered });
    });
  });
}

/** Set registration status for event and signed-in user */
export async function POST(
  request: NextRequest,
  { params }: Props,
): Promise<Response> {
  const decodeBody = record({
    registered: boolean,
  });
  const { registered } = decodeBody(await request.json());
  return withAuthenticatedUser((user) => {
    const { slug } = params;
    return withEvent(slug, async (event) => {
      const userProfileTable = appBase("User Profiles");
      // Get database ID for the signed-in user’s profile record
      const userProfileId = await userProfileTable
        .select({
          filterByFormula: `{slackId} = "${user.slackId}"`,
          maxRecords: 1,
        })
        .all()
        .then((records) => records[0].id);
      // Add or remove signed-in user’s ID from the list of registered users
      const updatedUserIds = registered
        ? [...event.registeredUsers, userProfileId]
        : event.registeredUsers.filter((id) => id !== userProfileId);
      // Update event record
      await eventsTable.update(event.id, {
        "Registered Users": updatedUserIds,
      });
      return new Response("Updated", { status: 200 });
    });
  });
}

async function withEvent(
  slug: string,
  action: (event: Event) => Promise<Response>,
): Promise<Response> {
  const matchingEvents = await findEventsWithSlug(slug);

  if (matchingEvents.length === 0) {
    return new Response("No matching event found", { status: 404 });
  }

  if (matchingEvents.length > 1) {
    return new Response("Multiple events match slug", { status: 500 });
  }

  const [event] = matchingEvents;
  if (!event.quickRegistrationMode) {
    return new Response("Quick registration mode not enabled for event", {
      status: 400,
    });
  }

  return await action(event);
}
