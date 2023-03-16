import { PortalProject } from "lib/airtable/project";
import { PortalEvent } from "lib/airtable/event";
import { PortalOpportunity } from "lib/airtable/opportunity";

/** Site URL without trailing slash */
export const siteUrl = "https://cesko.digital";

const ExternalRoutes = {
  submitProject: "https://airtable.com/shrP207QR9RrHTZEi",
  brandManual: "https://znacka.cesko.digital/",
  blog: "https://blog.cesko.digital",
  slackOnboarding: "https://slack.cesko.digital/",
  youtube: "https://www.youtube.com/c/ČeskoDigital",
  darujme: "https://www.darujme.cz/projekt/1203553",
};

const LocalizationRoutes = {
  english: (path = "/") => "https://en.cesko.digital" + addLeadingSlash(path),
  czech: (path = "/") => siteUrl + addLeadingSlash(path),
};

const StaticRoutes = {
  opportunities: "/opportunities",
  joinUs: "/join",
  profile: "/profile",
  marketplace: "/marketplace",
  supportUs: "/support",
  aboutUs: "/about",
  events: "/events",
  dashboard: "/dashboard",
  partners: "/partners",
  projects: "/projects",
};

const DynamicRoutes = {
  toProject: (p: PortalProject) => `/projects/${p.slug}`,
  toEvent: (e: PortalEvent) => `/events/${e.slug}`,
  toOpportunity: (o: Pick<PortalOpportunity, "slug">) =>
    `/opportunities/${o.slug}`,
};

/** Create URLs for frequently used routes */
export const Route = {
  ...ExternalRoutes,
  ...LocalizationRoutes,
  ...StaticRoutes,
  ...DynamicRoutes,
};

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

//
// Helpers
//

const addLeadingSlash = (path: string) =>
  path.startsWith("/") ? path : "/" + path;
