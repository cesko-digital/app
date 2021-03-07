import { mapVolunteers } from '../map-volunteers'
import { Volunteer as VolunteerProps } from 'templates/project/components/about/volunteers'
import { ProjectRole, Volunteer } from 'generated/graphql-types'

describe('mapVolunteers', () => {
  it('should map project roles with volunteers to volunteers props correctly', () => {
    const role = 'Best President'
    const name = 'Václav Havel'
    const profilePictureUrl = 'https://cesko.digital'
    const result: VolunteerProps[] = [{ role, name, profilePictureUrl }]
    expect(
      mapVolunteers([
        {
          name: role,
          volunteer: {
            name,
            profilePictureUrl,
          } as Volunteer,
        } as ProjectRole,
      ])
    ).toEqual(result)
  })
})
