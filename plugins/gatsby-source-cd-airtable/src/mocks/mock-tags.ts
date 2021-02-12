import { Tag } from '../interfaces/project'

export const getMockTags: () => Tag[] = () => [
  {
    name: 'First tag',
    rowId: '1',
    lang: 'en',
    slug: 'first-tag',
  },
  {
    name: 'První tag',
    rowId: '1',
    lang: 'cs',
    slug: 'prvni-tag',
  },
]
