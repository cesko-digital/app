import { marked } from "marked";
import { PortalProject } from "lib/airtable/project";
import { PortalEvent } from "lib/airtable/event";
import { PortalOpportunity } from "lib/airtable/opportunity";

/** Create URLs for frequently used routes */
export const Route = {
  // External links
  submitProject: "https://airtable.com/shrP207QR9RrHTZEi",
  brandManual: "https://znacka.cesko.digital/",
  blog: "https://blog.cesko.digital",
  slackOnboarding: "https://slack.cesko.digital/",
  youtube: "https://www.youtube.com/c/ČeskoDigital",
  darujme: "https://www.darujme.cz/projekt/1203553",
  // Localization
  english: (path = "/") => "https://en.cesko.digital" + addLeadingSlash(path),
  czech: (path = "/") => "https://cesko.digital" + addLeadingSlash(path),
  // Static routes
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
  // Dynamic routes
  toProject: (p: PortalProject) => `/projects/${p.slug}`,
  toEvent: (e: PortalEvent) => `/events/${e.slug}`,
  toOpportunity: (o: PortalOpportunity) => `/opportunities/${o.slug}`,
};

const addLeadingSlash = (path: string) =>
  path.startsWith("/") ? path : "/" + path;

/** Approximate size of the Česko.Digital community (number of people in Slack) */
export const communitySize = 5800;

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

/** Elements with this class will be skipped when translating website content with Weglot */
export const doNotTranslate = "no_translate";

/** Get URL to image resized to requested width */
export function getResizedImgUrl(
  originalUrl: string,
  targetWidth: number
): string {
  if (originalUrl.startsWith("https://data.cesko.digital/")) {
    return (
      originalUrl.replace(
        /data\.cesko\.digital/g,
        "cesko.digital/api/resize?src="
      ) +
      "&width=" +
      targetWidth
    );
  } else {
    return originalUrl;
  }
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

/** Return a shuffled copy of the input array */
export const shuffled = <T>(array: readonly T[]) => shuffleInPlace([...array]);

/** Split array to chunks of size `size` */
export function splitToChunks<T>(array: readonly T[], size: number) {
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

export function map<T, U>(
  val: T | undefined | null,
  f: (_: T) => U
): U | undefined {
  return val ? f(val) : undefined;
}
