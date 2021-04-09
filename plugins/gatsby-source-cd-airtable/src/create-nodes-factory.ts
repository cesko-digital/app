import { SourceNodesArgs } from 'gatsby'
import { Project, Tag, Volunteer, Partner } from './interfaces'
import { getProjectId, getTagId, getVolunteerId } from './transformers'

// Docs: https://www.gatsbyjs.com/docs/creating-a-source-plugin

export const createProjectNodesFactory = ({
  actions: { createNode },
  createContentDigest,
}: SourceNodesArgs): ((projects: Project[]) => void) => (projects) => {
  return projects.forEach((project) => {
    const tagNodeIds = project.tags.map((tagRowId) =>
      getTagId({ lang: project.lang, rowId: tagRowId })
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

export const createPartnerNodesFactory = ({
  actions: { createNode },
  createContentDigest,
}: SourceNodesArgs): ((partners: Partner[]) => void) => (partners) => {
  partners.forEach((partner) => {
    createNode({
      ...partner,
      id: `Partner-${partner.rowId}`,
      internal: {
        type: 'Partner',
        contentDigest: createContentDigest(partner),
      },
    })
  })
}
