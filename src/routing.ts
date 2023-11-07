import { Event } from "src/data/events";

/** Create URLs for frequently used routes */
export const Route = {
  // Static routes
  events: "/events",
  // Dynamic routes
  toEvent: (e: Event) => `/events/${e.slug}`,
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
