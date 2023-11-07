import { unwrapRecords, webBase } from "./airtable";
import {
  decodeValidItemsFromArray,
  markdown,
  relationToZeroOrMany,
  takeFirst,
  withDefault,
} from "src/decoding";
import {
  array,
  boolean,
  decodeType,
  field,
  fields,
  optional,
  record,
  string,
} from "typescript-json-decoder";

/** Table views you can use when querying the event table */
export type TableView = "All Events" | "Live Events" | "iCal Feed";

//
// Decoding
//

export type Event = decodeType<typeof decodeEvent>;
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
  published: field("Published", withDefault(boolean, false)),
  registrationUrl: field("RSVP URL", optional(string)),
  registrationTitle: field("RSVP Title", optional(string)),
  quickRegistrationMode: field(
    "Enable Quick Registration",
    withDefault(boolean, false)
  ),
  registeredUsers: field("Registered Users", relationToZeroOrMany),
  registeredUserSlackIds: field(
    "Registered User Slack IDs",
    relationToZeroOrMany
  ),
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

/** Get all events */
export async function getAllEvents(
  view: TableView = "All Events"
): Promise<Event[]> {
  return await eventsTable
    .select({ view })
    .all()
    .then(unwrapRecords)
    .then(decodeValidItemsFromArray(decodeEvent, "Events"));
}

/** Get all events with matching slug */
export const findEventsWithSlug = async (slug: string) =>
  await eventsTable
    .select({ filterByFormula: `{Slug} = "${slug}"` })
    .all()
    .then(unwrapRecords)
    .then(array(decodeEvent));

//
// Utils
//

/**
 * Return a human readable event duration such as “120 minut” or “6 hodin”
 *
 * If the duration is outside the expected range, you’ll get `null` instead.
 */
export function getEventDuration(
  event: Pick<Event, "startTime" | "endTime">
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
export function isEventPast(event: Event, date: Date = new Date()): boolean {
  const eventDate = new Date(event.startTime);
  return eventDate.getTime() < date.getTime();
}

/** Compare events by start time, can be used to sort events by start time */
export const compareEventsByTime = (a: Event, b: Event) =>
  Date.parse(a.startTime) - Date.parse(b.startTime);
