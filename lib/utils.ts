import { marked } from "marked";

/** Our Google Analytics tracking ID */
export const analyticsId = "UA-140227366-1";

export type MarkdownString = {
  source: string;
};

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

export function shuffleInPlace<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function splitToChunks<T>(array: T[], size: number) {
  let chunks = [];
  let i = 0;
  let n = array.length;

  while (i < n) {
    chunks.push(array.slice(i, (i += size)));
  }

  return chunks;
}

export const unique = <T>(a: T[]) => [...new Set(a)];

export const getRandomElem = <T>(a: T[]) =>
  a[Math.floor(Math.random() * a.length)];
