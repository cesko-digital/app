import { SourceNodesArgs } from 'gatsby'
import {
  transformPartners,
  transformProjects,
  transformTags,
  transformVolunteers,
} from './src/transformers'
import { loadData } from './src/load-data'
import {
  PluginOptions,
  AirTablePartner,
  AirTableProject,
  AirTableTag,
  AirTableVolunteer,
} from './src/interfaces'
import { ConnectionError } from './src/errors/connection-error'
import {
  createPartnerNodesFactory,
  createProjectNodesFactory,
  createTagNodesFactory,
  createVolunteerNodesFactory,
} from './src/create-nodes-factory'
import {
  getMockProjects,
  getMockTags,
  getMockVolunteers,
  getMockPartners,
} from './src/mocks'

export const sourceNodes = async (
  sourceNodesArgs: SourceNodesArgs,
  options: PluginOptions
): Promise<void> => {
  const createPartnerSourceNodes = createPartnerNodesFactory(sourceNodesArgs)
  const createVolunteerSourceNodes = createVolunteerNodesFactory(
    sourceNodesArgs
  )
  const createTagSourceNodes = createTagNodesFactory(sourceNodesArgs)
  const createProjectSourceNodes = createProjectNodesFactory(sourceNodesArgs)

  const setupMockData = () => {
    createPartnerSourceNodes(getMockPartners())
    createVolunteerSourceNodes(getMockVolunteers())
    createTagSourceNodes(getMockTags())
    createProjectSourceNodes(getMockProjects())
  }

  // For Cypress tests, yarn develop fails with NODE_ENV=test
  if (process.env.USE_MOCKS) {
    sourceNodesArgs.reporter.warn(
      'Mock data ENV var enabled. Using internal mock data instead.'
    )

    setupMockData()
    return
  }

  try {
    const [
      airTablePartners,
      airTableVolunteers,
      airTableTags,
      airtableProjects,
    ] = await Promise.all([
      loadData<AirTablePartner>(options.partnersTableName),
      loadData<AirTableVolunteer>(options.volunteersTableName),
      loadData<AirTableTag>(options.tagsTableName),
      loadData<AirTableProject>(options.projectsTableName),
    ])

    const partners = transformPartners(airTablePartners)
    const volunteers = transformVolunteers(airTableVolunteers)
    const tags = transformTags(airTableTags)
    const projects = transformProjects(airtableProjects)

    createPartnerSourceNodes(partners)
    createVolunteerSourceNodes(volunteers)
    createTagSourceNodes(tags)
    createProjectSourceNodes(projects)
  } catch (e) {
    if (e instanceof ConnectionError) {
      sourceNodesArgs.reporter.warn(
        'Data sourcing failed because of connection error. Using internal mock data instead.'
      )

      setupMockData()
    } else {
      sourceNodesArgs.reporter.panic(
        'Data sourcing failed because of following error:',
        e
      )
    }
  }
}
