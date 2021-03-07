import { Language, Project } from '../interfaces/project'

export const getMockProjects: () => Project[] = () => {
  const base = {
    tags: ['1'],
    contributeText: 'Lorem ipsum',
    description: 'Lorem ipsum',
    trelloUrl: 'https://cesko.digital',
    githubUrl: 'https://cesko.digital',
    url: 'https://cesko.digital',
    progress: 88,
    lead: '1',
    projectRoles: ['1'],
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
      ...base,
    },
    {
      name: 'First project',
      rowId: '1',
      lang: Language.English,
      slug: 'first-project',
      highlighted: true,
      ...base,
    },
    {
      name: 'Druhý projekt',
      rowId: '2',
      lang: Language.Czech,
      slug: 'druhy-projekt',
      highlighted: false,
      ...base,
    },
    {
      name: 'Second project',
      rowId: '2',
      lang: Language.English,
      slug: 'second-project',
      highlighted: false,
      ...base,
    },
  ]
}
