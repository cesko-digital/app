import { SourceNodesArgs } from 'gatsby'
import { Project, ProjectRole, Tag, Volunteer } from './interfaces/project'
import {
  getProjectId,
  getProjectRoleId,
  getTagId,
  getVolunteerId,
} from './transformers'

// Docs: https://www.gatsbyjs.com/docs/creating-a-source-plugin

export const createProjectNodesFactory = ({
  actions: { createNode },
  createContentDigest,
}: SourceNodesArgs): ((projects: Project[]) => void) => (projects) => {
  return projects.forEach((project) => {
    const tagNodeIds = project.tags.map((tagRowId) =>
      getTagId({ lang: project.lang, rowId: tagRowId })
    )
    const projectRoleIds = project.projectRoles.map((projectRoleRowId) =>
      getProjectRoleId({ lang: project.lang, rowId: projectRoleRowId })
    )
    createNode({
      ...project,
      id: getProjectId(project),
      internal: {
        type: 'Project',
        contentDigest: createContentDigest(project),
      },
      // Reverse relationship (ref: https://www.gatsbyjs.com/docs/creating-a-source-plugin/#creating-the-reverse-relationship)
      tags___NODE: tagNodeIds,
      tags: undefined,
      projectRoles___NODE: projectRoleIds,
      projectRoles: undefined,
      lead___NODE: getVolunteerId(project.lead),
      lead: undefined,
    })
  })
}

export const createTagNodesFactory = ({
  actions: { createNode },
  createContentDigest,
}: SourceNodesArgs): ((tags: Tag[]) => void) => (tags) => {
  tags.forEach((tag) => {
    createNode({
      ...tag,
      id: getTagId(tag),
      internal: {
        type: 'Tag',
        contentDigest: createContentDigest(tag),
      },
    })
  })
}

export const createVolunteerNodesFactory = ({
  actions: { createNode },
  createContentDigest,
}: SourceNodesArgs): ((volunteers: Volunteer[]) => void) => (volunteers) => {
  volunteers.forEach((volunteer) => {
    createNode({
      ...volunteer,
      id: getVolunteerId(volunteer.rowId),
      internal: {
        type: 'Volunteer',
        contentDigest: createContentDigest(volunteer),
      },
    })
  })
}

export const createProjectRoleNodesFactory = ({
  actions: { createNode },
  createContentDigest,
}: SourceNodesArgs): ((projectRoles: ProjectRole[]) => void) => (
  projectRoles
) => {
  projectRoles.forEach((projectRole) => {
    createNode({
      ...projectRole,
      id: getProjectRoleId(projectRole),
      internal: {
        type: 'ProjectRole',
        contentDigest: createContentDigest(projectRole),
      },
      volunteer: undefined,
      volunteer___NODE: getVolunteerId(projectRole.volunteer),
    })
  })
}
