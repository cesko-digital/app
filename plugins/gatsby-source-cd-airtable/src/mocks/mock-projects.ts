import { Project } from '../interfaces/project'

export const getMockProjects: () => Project[] = () => [
  {
    name: 'First project',
    originalId: '1',
    tagline: 'This is first mocked project',
  },
  {
    name: 'Second project',
    originalId: '2',
    tagline: 'This is second mocked project',
  },
  {
    name: 'Third project',
    originalId: '3',
    tagline: null,
  },
]
