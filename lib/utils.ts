import { marked } from "marked";

export type MarkdownString = {
  source: string;
};

export function isExternalURL(url: string): boolean {
  const lc = url.toLowerCase();
  return (
    lc.startsWith("http://") ||
    lc.startsWith("https://") ||
    lc.startsWith("mailto:")
  );
}

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
  return /^anezka@cesko.digital|^gabriela@cesko.digital/.test(input)
}
