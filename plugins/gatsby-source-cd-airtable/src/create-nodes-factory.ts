import { SourceNodesArgs } from 'gatsby'
import { Project, Tag } from './interfaces/project'
import { getProjectId, getTagId } from './transformers'

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
