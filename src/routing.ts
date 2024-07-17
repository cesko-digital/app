import { type UserProfile } from "~/src/data/user-profile";

import { type Event } from "./data/event";
import { type MetricDefinition } from "./data/metrics";
import { type Opportunity } from "./data/opportunity";
import { type Project } from "./data/project";

const register = (email: string | undefined = undefined) =>
  email ? `/join?${new URLSearchParams({ email })}` : "/join";

/** Create URLs for frequently used routes */
export const Route = {
  // External routes
  forum: "https://diskutuj.digital/",
  blog: "https://blog.cesko.digital/",
  slackOnboarding:
    "https://join.slack.com/t/cesko-digital/shared_invite/zt-2czwf0gyv-2gKtKr7bHHIXk40xTbRckQ",
  marketplace: "https://diskutuj.digital/c/trziste/5",
  // Static routes
  events: "/events",
  projects: "/projects",
  opportunities: "/opportunities",
  people: "/people",
  register,
  account: "/account",
  stats: "/stats",
  // More static routes
  eventFeed: "/events/feed.ical",
  // Dynamic routes
  toEvent: (e: Event) => `/events/${e.slug}`,
  toProject: (p: Pick<Project, "slug">) => `/projects/${p.slug}`,
  toOpportunity: (o: Pick<Opportunity, "slug">) => `/opportunities/${o.slug}`,
  toYouTubePlaylist: (playlistId: string) =>
    `https://www.youtube.com/playlist?list=${playlistId}`,
  toMetric: (m: Pick<MetricDefinition, "slug">) => `/stats/${m.slug}`,
  toProfile: (p: Pick<UserProfile, "id">) => `/people/${p.id}`,
};

/** Site URL without trailing slash */
export const siteUrl = "https://app.cesko.digital";

/**
 * Convert a relative path to an absolute URL
 *
 * Paths that are already absolute will be left untouched.
 */
export const absolute = (path = "/") => {
  if (path.startsWith("http")) {
    return path;
  } else if (path.startsWith("/")) {
    return siteUrl + path;
  } else {
    return siteUrl + "/" + path;
  }
};
