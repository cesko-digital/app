import { Language, Tag } from '../types'

export const getMockTags: () => Tag[] = () => [
  {
    name: 'First tag',
    rowId: '1',
    lang: Language.English,
    slug: 'first-tag',
  },
  {
    name: 'První tag',
    rowId: '1',
    lang: Language.Czech,
    slug: 'prvni-tag',
  },
]
