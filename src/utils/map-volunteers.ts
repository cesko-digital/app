import { ProjectRole } from 'generated/graphql-types'
import { Volunteer } from 'templates/project/components/about/volunteers'

export const mapVolunteers = (projectRoles: ProjectRole[]): Volunteer[] =>
  projectRoles.map((projectRole) => ({
    role: projectRole.name,
    ...projectRole.volunteer,
  }))
