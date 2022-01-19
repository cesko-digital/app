import { PortalEvent, PortalPartner } from "./portal-types";

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

export function filterPartnersByCategory(
  partners: readonly PortalPartner[],
  category: ArrayElement<PortalPartner["categories"]>
) {
  return partners.filter((p) => p.categories.some((c) => c === category));
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

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
