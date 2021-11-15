import { NodeInput } from 'gatsby'
import { createContentDigest } from 'gatsby-core-utils'
import { Project, Tag, Volunteer, Partner, Event, Opportunity } from './types'
import { getProjectId, getTagId, getVolunteerId } from './transformers'
import { map } from './utils'

// Docs: https://www.gatsbyjs.com/docs/creating-a-source-plugin

export function nodeFromProject(project: Project): NodeInput {
  const tagNodeIds = project.tags.map((tagRowId) =>
    getTagId({ rowId: tagRowId })
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
    owner___NODE: map(event.owner, getVolunteerId),
    owner: undefined,
    // Event–Project relationship
    project___NODE: event.project
      ? getProjectId({ rowId: event.project })
      : undefined,
    project: undefined,
    // Event-Tag relationship
    tags___NODE: event.tags?.map((t) => getTagId({ rowId: t })),
    tags: undefined,
  }
}

export function nodeFromOpportunity(opportunity: Opportunity): NodeInput {
  return {
    ...opportunity,
    id: `Opportunity-${opportunity.rowId}`,
    internal: {
      type: 'Opportunity',
      contentDigest: createContentDigest(opportunity),
    },
    // Opportunity-Owner relationship
    owner___NODE: map(opportunity.owner, getVolunteerId),
    owner: undefined,
    // Opportunity–Project relationship
    project___NODE: opportunity.project
      ? getProjectId({ rowId: opportunity.project })
      : undefined,
    project: undefined,
  }
}
