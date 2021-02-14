export const getTitle = ({
  percent,
  translations: { finished, incubator, ongoing },
}: {
  percent: number
  translations: { incubator: string; finished: string; ongoing: string }
}): string => {
  if (percent <= 20) {
    return incubator
  }

  if (percent >= 100) {
    return finished
  }

  return ongoing
}
