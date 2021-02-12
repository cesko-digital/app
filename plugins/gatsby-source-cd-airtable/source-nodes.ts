import { SourceNodesArgs } from 'gatsby'
import { transformProjects, transformTags } from './src/transformers'
import { PluginOptions } from './src/interfaces/plugin-options'
import { loadData } from './src/load-data'
import { AirTableProject } from './src/interfaces/airtable-project'
import { ConnectionError } from './src/errors/connection-error'
import {
  createProjectNodesFactory,
  createTagNodesFactory,
} from './src/create-nodes-factory'
import { getMockProjects } from './src/mocks/mock-projects'
import { getMockTags } from './src/mocks/mock-tags'

export const sourceNodes = async (
  sourceNodesArgs: SourceNodesArgs,
  options: PluginOptions
): Promise<void> => {
  const createTagSourceNodes = createTagNodesFactory(sourceNodesArgs)
  const createProjectSourceNodes = createProjectNodesFactory(sourceNodesArgs)
  try {
    const [airTableTags, airtableProjects] = await Promise.all([
      loadData<AirTableProject>(options.tagsTableName),
      loadData<AirTableProject>(options.projectsTableName),
    ])

    const tags = transformTags(airTableTags)
    const projects = transformProjects(airtableProjects)

    createTagSourceNodes(tags)
    createProjectSourceNodes(projects)
  } catch (e) {
    if (e instanceof ConnectionError) {
      sourceNodesArgs.reporter.warn(
        'Data sourcing failed because of connection error. Using internal mock data instead.'
      )
      createTagSourceNodes(getMockTags())
      createProjectSourceNodes(getMockProjects())
    } else {
      sourceNodesArgs.reporter.panic(
        'Data sourcing failed because of following error:',
        e
      )
    }
  }
}
