import { SourceNodesArgs } from 'gatsby'
import { Project } from './src/graphql-types/project'

/**
 * Create schema customizations so types will be always available in GraphQl (regardless import was successful or not)
 */
export const createSchemaCustomization = ({ actions: { createTypes } }: SourceNodesArgs): void => {
  createTypes(Project)
}
