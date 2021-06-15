import { NodeInput } from 'gatsby'
import { createContentDigest } from 'gatsby-core-utils'
import { Project, Tag, Volunteer, Partner, Event } from './types'
import { getProjectId, getTagId, getVolunteerId } from './transformers'

// Docs: https://www.gatsbyjs.com/docs/creating-a-source-plugin

export function nodeFromProject(project: Project): NodeInput {
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
      contentDigest: createContentDigest(project),
    },
    // Reverse relationship (ref: https://www.gatsbyjs.com/docs/creating-a-source-plugin/#creating-the-reverse-relationship)
    tags___NODE: tagNodeIds,
    tags: undefined,
    coordinators___NODE: coordinatorNodeIds,
    coordinators: undefined,
  }
}

export function nodeFromTag(tag: Tag): NodeInput {
  return {
    ...tag,
    id: getTagId(tag),
    internal: {
      type: 'Tag',
      contentDigest: createContentDigest(tag),
    },
  }
}

export function nodeFromVolunteer(volunteer: Volunteer): NodeInput {
  return {
    ...volunteer,
    id: getVolunteerId(volunteer.rowId),
    internal: {
      type: 'Volunteer',
      contentDigest: createContentDigest(volunteer),
    },
  }
}

export function nodeFromPartner(partner: Partner): NodeInput {
  return {
    ...partner,
    id: `Partner-${partner.rowId}`,
    internal: {
      type: 'Partner',
      contentDigest: createContentDigest(partner),
    },
  }
}

export function nodeFromEvent(event: Event): NodeInput {
  return {
    ...event,
    id: `Event-${event.rowId}`,
    internal: {
      type: 'Event',
      contentDigest: createContentDigest(event),
    },
    // Event-Owner relationship
    owner___NODE: getVolunteerId(event.owner),
    owner: undefined,
    // Event–Project relationship
    project___NODE: event.project
      ? getProjectId({ lang: 'cs', rowId: event.project })
      : undefined,
    project: undefined,
    // Event-Tag relationship
    tags___NODE: event.tags.map((t) => getTagId({ lang: 'cs', rowId: t })),
    tags: undefined,
  }
}
