import { getRandomElem, shuffleInPlace, unique } from "src/utils";
import {
  Event,
  compareEventsByTime,
  findEventsForProject,
  isEventPast,
} from "./event";
import { Opportunity, getAllOpportunities } from "./opportunity";
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

/**
 * Get featured opportunities
 *
 * - We want to see opportunities from different projects if possible
 * - Don’t show opportunities from projects that are not running
 */
export async function getFeaturedOpportunities(
  count = 3
): Promise<Opportunity[]> {
  const opportunities = await getAllOpportunities("Show to Users");
  // Let’s pick `count` projects to feature
  const featuredProjectIds = shuffleInPlace(
    unique(opportunities.map((o) => o.projectId))
  ).slice(0, count);
  if (featuredProjectIds.length < count) {
    // If we don’t have that many, just return random `count` opportunities
    return shuffleInPlace(opportunities.slice(0, count));
  } else {
    // Otherwise pick a random opportunity from each featured project
    return featuredProjectIds
      .map((id) => opportunities.filter((o) => o.projectId === id))
      .map((ops) => getRandomElem(ops))
      .flat();
  }
}
