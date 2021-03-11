import { ProjectPageQuery } from 'generated/graphql-types'
import { Volunteer } from 'templates/project/components/about/volunteers'

export const mapVolunteers = (
  projectRoles: NonNullable<ProjectPageQuery['project']>['projectRoles']
): Volunteer[] =>
  projectRoles.map((projectRole) => ({
    role: projectRole.name,
    ...projectRole.volunteer,
  }))
