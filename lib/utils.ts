import { marked } from "marked";
import { PortalVideo } from "./cedu";
import {
  PortalEvent,
  PortalOpportunity,
  PortalProject,
} from "lib/portal-types";

/** Create URLs for frequently used routes */
export const Route = {
  // External links
  submitProject: "https://airtable.com/shrP207QR9RrHTZEi",
  supportUs: "https://www.darujme.cz/projekt/1203553",
  brandManual: "https://znacka.cesko.digital/",
  blog: "https://blog.cesko.digital",
  slackOnboarding: "https://slack.cesko.digital/",
  // Static routes
  opportunities: "/opportunities",
  joinUs: "/join",
  profile: "/profile",
  // We don’t have a dedicated all-events page yet, see
  // https://github.com/cesko-digital/web/issues/356
  events: "/dashboard#section-events",
  dashboard: "/dashboard",
  partners: "/partners",
  projects: "/projects",
  // Dynamic routes
  toProject: (p: PortalProject) => `/projects/${p.slug}`,
  toEvent: (e: PortalEvent) => `/events/${e.slug}`,
  toOpportunity: (o: PortalOpportunity) => `/opportunities/${o.slug}`,
  toVideo: (v: PortalVideo) => `/cedu/${v.slug}`,
};

/** Our Google Analytics tracking ID */
export const analyticsId = "UA-140227366-1";

/** A simple string wrapper to avoid bugs from mixing HTML strings and Markdown source */
export type MarkdownString = {
  source: string;
};

/** Convert Markdown string to HTML */
export function markdownToHTML(source: string): string {
  return marked.parse(source, {
    breaks: true,
    gfm: true,
    pedantic: false,
    smartypants: false,
  });
}

export function getResizedImgUrl(
  originalUrl: string,
  targetWidth: number
): string {
  return originalUrl
    ? originalUrl.replace(
        /data\.cesko\.digital/g,
        "cesko.digital/api/resize?src="
      ) +
        "&width=" +
        targetWidth
    : "";
}

export function isOwnerEmailDisplayed(input: string): boolean {
  return /^anezka@cesko.digital|^gabriela@cesko.digital/.test(input);
}

/** Shuffle array in place, returns a reference to the same array */
export function shuffleInPlace<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/** Split array to chunks of size `size` */
export function splitToChunks<T>(array: T[], size: number) {
  let chunks = [];
  let i = 0;
  let n = array.length;

  while (i < n) {
    chunks.push(array.slice(i, (i += size)));
  }

  return chunks;
}

/** Filter out duplicates from an array, returns a new array */
export const unique = <T>(a: T[]) => [...new Set(a)];

/** Return a random element from an array */
export const getRandomElem = <T>(a: T[]) =>
  a[Math.floor(Math.random() * a.length)];
