import { SourceNodesArgs } from 'gatsby'
import { transformProject } from './src/transformers'
import { createNodesFactory } from './src/create-nodes-factory'
import { PluginOptions } from './src/interfaces/plugin-options'
import { loadData } from './src/load-data'
import { AirTableProject } from './src/interfaces/airtable-project'
import { ConnectionError } from './src/errors/connection-error'
import { getMockProjects } from './src/mocks/mock-projects'

export const sourceNodes = async (sourceNodesArgs: SourceNodesArgs, options: PluginOptions): Promise<void> => {
  const nodesFactory = createNodesFactory(sourceNodesArgs)
  const createProjects = nodesFactory('Project')

  try {
    const projects = await loadData<AirTableProject>(options.projectsTableName)
    createProjects(projects.map(transformProject))
  } catch (e) {
    if (e instanceof ConnectionError) {
      sourceNodesArgs.reporter.warn('Data sourcing failed because of connection error. Using internal mock data instead.')
      createProjects(getMockProjects())
    } else {
      sourceNodesArgs.reporter.panic('Data sourcing failed because of following error:', e)
    }
  }
}
