import {
  Event,
  compareEventsByTime,
  findEventsForProject,
  isEventPast,
} from "./event";
import { Project } from "./project";

/**
 * Get featured events for a project
 *
 * If there are upcoming, future events, start with those, in
 * chronological order (closest events first). Then take past
 * events in reverse chronological order (closes events first).
 */
export async function getFeaturedEventsForProject(
  project: Project,
  count = 3
): Promise<Event[]> {
  const allEvents = await findEventsForProject(project.slug);
  const pastEvents = allEvents.filter((e) => isEventPast(e));
  const futureEvents = allEvents.filter((e) => !isEventPast(e));
  return [
    ...futureEvents.sort(compareEventsByTime),
    ...pastEvents.sort(compareEventsByTime).reverse(),
  ].slice(0, count);
}
