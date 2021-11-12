export function getResizedImgUrl(
  originalUrl: string,
  targetWidth: number
): string {
  return (
    originalUrl.replaceAll(
      'data.cesko.digital',
      'cesko.digital/api/resize?src='
    ) +
    '&width=' +
    targetWidth
  )
}
