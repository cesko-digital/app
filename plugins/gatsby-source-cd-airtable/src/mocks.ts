import { Language, Project, Tag, Volunteer, Event, Partner } from './types'
import { notEmpty } from './utils'
import { transformEvent } from './transformers'

import events from '../samples/events.json'

export const getMockVolunteers: () => Volunteer[] = () => [
  {
    name: 'Václav Havel',
    rowId: '1',
    email: 'vaclav@havel.cz',
    company: 'Czechia',
    profilePictureUrl: 'https://via.placeholder.com/100',
  },
]

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

export const getMockProjects: () => Project[] = () => {
  const base = {
    tags: ['1'],
    contributeText: 'Lorem ipsum',
    description: 'Lorem ipsum',
    trelloUrl: 'https://cesko.digital',
    githubUrl: 'https://cesko.digital',
    url: 'https://cesko.digital',
    coordinators: ['1'],
    tagline: 'Lorem ipsum',
    coverUrl: 'https://via.placeholder.com/400x200',
    logoUrl: 'https://via.placeholder.com/100',
  }

  return [
    {
      name: 'První projekt',
      rowId: '1',
      lang: Language.Czech,
      slug: 'prvni-projekt',
      highlighted: true,
      finished: false,
      ...base,
    },
    {
      name: 'First project',
      rowId: '1',
      lang: Language.English,
      slug: 'first-project',
      highlighted: true,
      finished: false,
      ...base,
    },
    {
      name: 'Druhý projekt',
      rowId: '2',
      lang: Language.Czech,
      slug: 'druhy-projekt',
      highlighted: false,
      finished: true,
      ...base,
    },
    {
      name: 'Second project',
      rowId: '2',
      lang: Language.English,
      slug: 'second-project',
      highlighted: false,
      finished: true,
      ...base,
    },
  ]
}

export const getMockPartners: () => Partner[] = () => [
  {
    rowId: '1',
    name: 'Partner 1',
    logoUrl: 'https://via.placeholder.com/400x200',
    url: 'https://cesko.digital',
  },
  {
    rowId: '2',
    name: 'Partner 2',
    logoUrl: 'https://via.placeholder.com/200x200',
    url: 'https://cesko.digital',
  },
  {
    rowId: '3',
    name: 'Partner 3',
    logoUrl: 'https://via.placeholder.com/400x200',
    url: 'https://cesko.digital',
  },
]

export const getMockEvents: () => Event[] = () =>
  events.records.map(transformEvent).filter(notEmpty)
