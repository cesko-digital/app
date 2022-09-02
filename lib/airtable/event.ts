import { unwrapRecords, webBase } from "./request";
import {
  decodeValidItemsFromArray,
  markdown,
  takeFirst,
  withDefault,
} from "lib/decoding";
import {
  array,
  decodeType,
  field,
  fields,
  optional,
  record,
  string,
  union,
} from "typescript-json-decoder";

//
// Decoding
//

export type PortalEvent = decodeType<typeof decodeEvent>;
export const decodeEvent = record({
  id: field("ID", string),
  name: field("Name", string),
  slug: fields(
    // Read slug from the `Slug` field and fall
    // back to `id` if the `Slug` field is empty.
    { Slug: optional(string), id: field("ID", string) },
    ({ Slug, id }) => Slug ?? id
  ),
  summary: field("Summary", string),
  description: field("Description", markdown),
  startTime: field("Start Time", string),
  ownerId: field("Owner", takeFirst(array(string))),
  projectId: field("Project", takeFirst(array(string))),
  status: field("Status", union("draft", "live", "unlisted")),
  registrationUrl: field("RSVP URL", optional(string)),
  registrationTitle: field("RSVP Title", optional(string)),
  endTime: field("End Time", optional(string)),
  tagIds: field("Tags", withDefault(array(string), [])),
  coverImageUrl: field("Cover URL", optional(string)),
  locationTitle: field("Location Title", optional(string)),
  locationUrl: field("Location URL", optional(string)),
});

//
// API Calls
//

/** Events table */
export const eventsTable = webBase("Events");

/** Get all projects */
export async function getAllEvents(): Promise<PortalEvent[]> {
  return await eventsTable
    .select()
    .all()
    .then(unwrapRecords)
    .then(decodeValidItemsFromArray(decodeEvent, "Events"));
}

//
// Utils
//

/**
 * Return a human readable event duration such as “120 minut” or “6 hodin”
 *
 * If the duration is outside the expected range, you’ll get `null` instead.
 */
export function getEventDuration(
  event: Pick<PortalEvent, "startTime" | "endTime">
): string | null {
  if (!event.endTime) {
    return null;
  }

  const start = new Date(event.startTime);
  const end = new Date(event.endTime);

  const minutes = (end.getTime() - start.getTime()) / 1000 / 60;

  if (minutes === 0) {
    return null;
  }

  if (minutes > 0 && minutes < 180) {
    return `${minutes} minut`;
  }

  const hours = minutes / 60;
  if (hours <= 4) {
    return `${hours} hodiny`;
  } else if (hours <= 48) {
    return `${hours} hodin`;
  }

  return null;
}

/** Is event’s start time in the past? */
export function isEventPast(
  event: PortalEvent,
  date: Date = new Date()
): boolean {
  const eventDate = new Date(event.startTime);
  return eventDate.getTime() < date.getTime();
}

/** Compare events by start time, can be used to sort events by start time */
export const compareEventsByTime = (a: PortalEvent, b: PortalEvent) =>
  Date.parse(a.startTime) - Date.parse(b.startTime);
