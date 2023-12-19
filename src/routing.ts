import { type Event } from "~/src/data/event";
import { type MarketPlaceOffer } from "~/src/data/market-place";

import { type Opportunity } from "./data/opportunity";
import { type Project } from "./data/project";

/** Create URLs for frequently used routes */
export const Route = {
  // External routes
  forum: "https://diskutuj.digital/",
  blog: "https://blog.cesko.digital/",
  slackOnboarding: "https://slack.cesko.digital/",
  // Static routes
  events: "/events",
  projects: "/projects",
  opportunities: "/opportunities",
  marketplace: "/market-place",
  register: "/join",
  signIn: "/sign-in",
  userProfile: "/profile",
  // More static routes
  eventFeed: "/events/feed.ical",
  // Dynamic routes
  toEvent: (e: Event) => `/events/${e.slug}`,
  toProject: (p: Project) => `/projects/${p.slug}`,
  toOpportunity: (o: Pick<Opportunity, "slug">) => `/opportunities/${o.slug}`,
  toMarketPlaceOffer: (o: MarketPlaceOffer) => `/market-place#${o.id}`,
  toYouTubePlaylist: (playlistId: string) =>
    `https://www.youtube.com/playlist?list=${playlistId}`,
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
