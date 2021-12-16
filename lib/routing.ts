import {
  PortalEvent,
  PortalOpportunity,
  PortalProject,
} from "lib/portal-types";

/** Create URLs for frequently used routes */
export const Route = {
  // External links
  submitProject: "https://airtable.com/shrP207QR9RrHTZEi",
  joinUs: "https://join.cesko.digital/",
  supportUs: "https://www.darujme.cz/projekt/1203553",
  brandManual: "https://znacka.cesko.digital/",
  blog: "https://blog.cesko.digital",
  // Static routes
  opportunities: "/opportunities",
  volunteerPortal: "/portal-dobrovolnika",
  // Dynamic routes
  toProject: (p: PortalProject) => `/projekt/${p.slug}`,
  toEvent: (e: PortalEvent) => `/events/${e.slug}`,
  toOpportunity: (o: PortalOpportunity) => `/opportunities/${o.slug}`,
};
