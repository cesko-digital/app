import crypto from "crypto";

/** Approximate size of the Česko.Digital community (number of people in Slack) */
export const communitySize = 6000;

/** A simple string wrapper to avoid bugs from mixing HTML strings and Markdown source */
export type MarkdownString = {
  source: string;
};

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

/** Map function over a possibly null value */
export function map<T, U>(
  val: T | undefined | null,
  f: (_: T) => U
): U | undefined {
  return val ? f(val) : undefined;
}

/** Simple e-mail normalization – convert to lowercase, remove whitespace */
export function normalizeEmailAddress(email: string): string {
  return (
    email
      // Convert to lower case
      .toLocaleLowerCase()
      // Strip leading whitespace
      .replaceAll(/^\s+/g, "")
      // Strip trailing whitespace
      .replaceAll(/\s+$/g, "")
  );
}

/**
 * Simple e-mail validation
 *
 * Proper e-mail address validation is _hard_, the only really reasonable
 * option is to send a validation link to the e-mail address, but let’s have
 * at least something basic here to guard users from plain typos.
 */
export const looksLikeEmailAdress = (s: string) =>
  !!s.match(/^[^@ ]+@[^@ ]+\.[^@ ]+$/);

/** Filtering convenience, see https://stackoverflow.com/questions/43118692 */
export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}

/**
 * Compute a simple message digest
 *
 * The algorithm hashes the params together with `process.env.SHASUM_SECRET`
 * and returns first 10 hex digits of that.
 */
export function hashDigest(
  params: string[],
  secret = process.env.SHASUM_SECRET || ""
): string {
  const shasum = crypto.createHash("sha1");
  shasum.update([...params, secret].join(":"));
  return shasum.digest("hex").slice(0, 10);
}

/** Return a pretty-printed JSON `Response` */
export const formattedJSONResponse = (payload: any) =>
  new Response(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type": "application/json",
    },
  });

/** Frequently used content types */
export const ContentType = {
  json: "application/json; charset=utf-8",
  csv: "text/csv; charset=utf-8",
  rss: "application/rss+xml; charset=utf-8",
  html: "text/html; charset=utf-8",
  txt: "text/plain; charset=utf-8",
  ical: "text/calendar; charset=utf-8",
};

/** Filler text to aid with developing */
export const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
minim veniam, quis nostrud exercitation ullamco laboris nisi ut
aliquip ex ea commodo consequat. Duis aute irure dolor in
reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
culpa qui officia deserunt mollit anim id est laborum.`;
