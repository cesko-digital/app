import ical from "ical-generator";
import { getAllEvents } from "lib/airtable/event";
import { Route, absolute } from "lib/routing";

export async function GET(): Promise<Response> {
  const events = await getAllEvents("iCal Feed");
  const calendar = ical({
    name: "Akce Česko.Digital",
    url: absolute(Route.events),
  });
  for (const event of events) {
    calendar.createEvent({
      summary: event.name,
      description: event.description.source,
      location: event.locationTitle,
      url: absolute(Route.toEvent(event)),
      start: new Date(event.startTime),
      end: event.endTime ? new Date(event.endTime) : undefined,
    });
  }
  return new Response(calendar.toString(), {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}
