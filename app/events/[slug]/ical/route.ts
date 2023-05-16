import ical from "ical-generator";
import { findEventsWithSlug } from "lib/airtable/event";
import { Route, absolute } from "lib/routing";

type Props = {
  params: {
    slug: string;
  };
};

export async function GET(_: Request, { params }: Props): Promise<Response> {
  const { slug } = params;
  const matchingEvents = await findEventsWithSlug(slug);
  if (matchingEvents.length === 0) {
    return new Response("Event not found", { status: 404 });
  }
  const [sourceEvent] = matchingEvents;
  const calendar = ical({
    name: "Akce Česko.Digital",
    url: absolute(Route.events),
  });
  calendar.createEvent({
    summary: sourceEvent.name,
    description: sourceEvent.description.source,
    start: sourceEvent.startTime,
    end: sourceEvent.endTime,
    location: sourceEvent.locationTitle,
    url: absolute(Route.toEvent(sourceEvent)),
  });
  return new Response(calendar.toString(), {
    status: 200,
    headers: {
      "Content-Type": "text/calendar",
      "Content-Disposition": "attachment; filename=event.ics",
    },
  });
}
