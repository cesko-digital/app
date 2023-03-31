import {
  eventsTable,
  findEventsWithSlug,
  PortalEvent,
} from "lib/airtable/event";
import { webBase } from "lib/airtable/request";
import { getToken, JWT } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { boolean, record } from "typescript-json-decoder";

type Props = {
  params: {
    slug: string;
  };
};

/** Get registration status for event and signed-in user */
export async function GET(
  request: Request,
  { params }: Props
): Promise<Response> {
  return withAuthenticatedUser(request, (token) => {
    const { slug } = params;
    return withEvent(slug, async (event) => {
      const signedInUserSlackId = token.sub!;
      const registered =
        event.registeredUserSlackIds.includes(signedInUserSlackId);
      return NextResponse.json({ registered });
    });
  });
}

/** Set registration status for event and signed-in user */
export async function POST(
  request: NextRequest,
  { params }: Props
): Promise<Response> {
  const decodeBody = record({
    registered: boolean,
  });
  const { registered } = decodeBody(await request.json());
  return withAuthenticatedUser(request, (token) => {
    const { slug } = params;
    return withEvent(slug, async (event) => {
      const signedInUserSlackId = token.sub!;
      const userProfileTable = webBase("User Profiles");
      // Get database ID for the signed-in user’s profile record
      const userProfileId = await userProfileTable
        .select({
          filterByFormula: `{slackId} = "${signedInUserSlackId}"`,
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

async function withAuthenticatedUser(
  request: Request,
  action: (token: JWT) => Promise<Response>
): Promise<Response> {
  const token = await getToken({ req: request as any });
  if (!token || !token.sub) {
    return new Response("Authentication required", { status: 401 });
  } else {
    return await action(token);
  }
}

async function withEvent(
  slug: string,
  action: (event: PortalEvent) => Promise<Response>
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
