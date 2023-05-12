import ical from "ical-generator";
import { getAllEvents } from "lib/airtable/event";
import { Route, absolute } from "lib/routing";
import { markdownToHTML } from "lib/utils";

export async function GET(): Promise<Response> {
  const events = await getAllEvents("iCal Feed");
  const calendar = ical({ name: "Akce Česko.Digital" });
  for (const event of events) {
    calendar.createEvent({
      summary: event.name,
      description: markdownToHTML(event.description.source),
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
