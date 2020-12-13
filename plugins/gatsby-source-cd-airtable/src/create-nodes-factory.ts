import { NodeInput, SourceNodesArgs } from 'gatsby'
import { SourceNode } from './interfaces/source-node'

export const createNodesFactory = ({ actions: { createNode }, createNodeId, createContentDigest }: SourceNodesArgs) => (
  type: string
): ((nodeSources: SourceNode[]) => void) => {
  if (!type) {
    throw new Error('Node type is required')
  }

  return <T extends SourceNode>(nodeSources: T[]): void => {
    nodeSources.forEach((nodeSource) => {
      const nodeMeta: NodeInput = {
        id: createNodeId(`${type}-${nodeSource.originalId}`),
        internal: {
          type,
          contentDigest: createContentDigest(nodeSource),
        },
      }
      createNode({
        ...nodeSource,
        ...nodeMeta,
      })
    })
  }
}
