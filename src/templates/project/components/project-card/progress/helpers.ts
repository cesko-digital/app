import { FINISHED_PROJECT_PROGRESS } from 'utils/constants'

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

  if (percent >= FINISHED_PROJECT_PROGRESS) {
    return finished
  }

  return ongoing
}
