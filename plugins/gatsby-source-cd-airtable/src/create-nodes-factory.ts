import { NodeInput } from 'gatsby'
import { Project, Tag, Volunteer, Partner } from './types'
import { getProjectId, getTagId, getVolunteerId } from './transformers'

// Docs: https://www.gatsbyjs.com/docs/creating-a-source-plugin

export function nodeFromProject(
  project: Project,
  contentDigest: string
): NodeInput {
  const tagNodeIds = project.tags.map((tagRowId) =>
    getTagId({ lang: project.lang, rowId: tagRowId })
  )
  const coordinatorNodeIds = project.coordinators.map((coordinatorRowId) =>
    getVolunteerId(coordinatorRowId)
  )
  return {
    ...project,
    id: getProjectId(project),
    internal: {
      type: 'Project',
      contentDigest,
    },
    // Reverse relationship (ref: https://www.gatsbyjs.com/docs/creating-a-source-plugin/#creating-the-reverse-relationship)
    tags___NODE: tagNodeIds,
    tags: undefined,
    coordinators___NODE: coordinatorNodeIds,
    coordinators: undefined,
  }
}

export function nodeFromTag(tag: Tag, contentDigest: string): NodeInput {
  return {
    ...tag,
    id: getTagId(tag),
    internal: {
      type: 'Tag',
      contentDigest,
    },
  }
}

export function nodeFromVolunteer(
  volunteer: Volunteer,
  contentDigest: string
): NodeInput {
  return {
    ...volunteer,
    id: getVolunteerId(volunteer.rowId),
    internal: {
      type: 'Volunteer',
      contentDigest,
    },
  }
}

export function nodeFromPartner(
  partner: Partner,
  contentDigest: string
): NodeInput {
  return {
    ...partner,
    id: `Partner-${partner.rowId}`,
    internal: {
      type: 'Partner',
      contentDigest,
    },
  }
}
