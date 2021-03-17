import { FINISHED_PROJECT_PROGRESS } from 'utils/constants'

export function getBodyText({
  progress,
  finishedProjectSubtitle,
  ongoingProjectSubtitle,
}: {
  progress: number
  finishedProjectSubtitle: string
  ongoingProjectSubtitle: string
}): string {
  if (progress >= FINISHED_PROJECT_PROGRESS) {
    return finishedProjectSubtitle
  }
  return ongoingProjectSubtitle
}
