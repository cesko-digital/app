import { findEventsWithSlug } from "lib/airtable/event";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

type Props = {
  params: {
    slug: string;
  };
};

/** Get registration status for event and signed-in user */
export async function GET(request: Request, { params }: Props) {
  // Check auth
  const token = await getToken({ req: request as any });
  if (!token || !token.sub) {
    return new Response("Authentication required", { status: 401 });
  }

  // Get matching event records
  const { slug } = params;
  const events = await findEventsWithSlug(slug).catch((e) => {
    console.error(e);
    return [];
  });
  if (events.length === 0) {
    return new Response("No matching event found", { status: 404 });
  }
  if (events.length > 1) {
    return new Response("Multiple events match slug", { status: 500 });
  }

  const [event] = events;
  if (!event.quickRegistrationMode) {
    return new Response("Quick registration mode not enabled for event", {
      status: 400,
    });
  }

  const signedInUserSlackId = token.sub!;
  return NextResponse.json({
    registered: event.registeredUserSlackIds.includes(signedInUserSlackId),
  });
}
