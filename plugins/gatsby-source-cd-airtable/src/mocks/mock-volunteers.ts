import { Volunteer } from '../interfaces/project'

export const getMockVolunteers: () => Volunteer[] = () => [
  {
    name: 'Václav Havel',
    rowId: '1',
    email: 'vaclav@havel.cz',
    company: 'Czechia',
    profilePictureUrl: 'https://via.placeholder.com/100',
  },
]
