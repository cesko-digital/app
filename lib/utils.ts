// This is a hack, see https://github.com/vercel/next.js/issues/11993
export const prepareToSerialize = (data: any) =>
  JSON.parse(JSON.stringify(data));

export function isExternalURL(url: string): boolean {
  const lc = url.toLowerCase();
  return (
    lc.startsWith("http://") ||
    lc.startsWith("https://") ||
    lc.startsWith("mailto:")
  );
}

export function getResizedImgUrl(
  originalUrl: string,
  targetWidth: number
): string {
  console.log(`Original URL: ${originalUrl}`);
  return originalUrl
    ? originalUrl.replaceAll(
        "data.cesko.digital",
        "cesko.digital/api/resize?src="
      ) +
        "&width=" +
        targetWidth
    : "";
}
