export function insertIf<T>({
  condition,
  elements,
}: {
  condition: boolean
  elements: Array<T>
}): Array<T> {
  if (!condition) {
    return []
  }

  return elements
}
