const EXTERNAL_URL_REGEXP = /https?:\/\/((?:[\w\d-]+\.)+[\w\d]{2,})/i

export function isExternalURL(url: string): boolean {
  return Boolean(EXTERNAL_URL_REGEXP.exec(url))
}
