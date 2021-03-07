import { Language, ProjectRole } from '../interfaces/project'

export const getMockProjectRoles: () => ProjectRole[] = () => [
  {
    name: 'Nejlepší prezident',
    rowId: '1',
    volunteer: '1',
    lang: Language.Czech,
  },
  {
    name: 'Best President',
    rowId: '1',
    volunteer: '1',
    lang: Language.English,
  },
]
