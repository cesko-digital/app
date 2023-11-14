import { Event } from "src/data/event";
import { Project } from "./data/project";
import { Opportunity } from "./data/opportunity";

/** Create URLs for frequently used routes */
export const Route = {
  // External routes
  forum: "https://diskutuj.digital/",
  blog: "https://blog.cesko.digital/",
  // Static routes
  events: "/events",
  projects: "/projects",
  opportunities: "/opportunities",
  marketplace: "/marketplace",
  // Dynamic routes
  toEvent: (e: Event) => `/events/${e.slug}`,
  toProject: (p: Project) => `/projects/${p.slug}`,
  toOpportunity: (o: Opportunity) => `/opportunities/${o.slug}`,
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
