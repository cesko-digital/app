export const insertIf = <Element>({
  condition,
  elements,
}: {
  condition: boolean
  elements: Array<Element>
}): Array<Element> => (condition ? elements : [])
