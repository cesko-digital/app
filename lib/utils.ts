import { marked } from "marked";

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
