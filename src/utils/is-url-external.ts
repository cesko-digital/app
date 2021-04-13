export function isExternalURL(url: string): boolean {
  const lc = url.toLowerCase()
  return (
    lc.startsWith('http://') ||
    lc.startsWith('https://') ||
    lc.startsWith('mailto:')
  )
}
