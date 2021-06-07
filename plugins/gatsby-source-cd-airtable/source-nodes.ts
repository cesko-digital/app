import { SourceNodesArgs } from 'gatsby'
import {
  transformPartners,
  transformProjects,
  transformTags,
  transformVolunteers,
} from './src/transformers'
import { getAllAirtableRecords } from './src/load-data'
import {
  PluginOptions,
  AirTablePartner,
  AirTableProject,
  AirTableTag,
  AirTableVolunteer,
} from './src/types'
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

  const haveAirtableConfig = options.airtableApiKey && options.airtableBaseUrl
  const forceMockMode = options.forceMockMode
  const useMockData = forceMockMode || !haveAirtableConfig

  if (useMockData) {
    const msg = forceMockMode
      ? 'Mock data ENV var enabled. Using internal mock data instead.'
      : 'Airtable config missing or incomplete, using internal mock data instead.'
    sourceNodesArgs.reporter.warn(msg)
    createPartnerSourceNodes(getMockPartners())
    createVolunteerSourceNodes(getMockVolunteers())
    createTagSourceNodes(getMockTags())
    createProjectSourceNodes(getMockProjects())
    return
  }

  try {
    const load = <T>(table: string): Promise<T[]> =>
      getAllAirtableRecords(
        options.airtableApiKey,
        options.airtableBaseUrl,
        table
      )

    const [
      airTablePartners,
      airTableVolunteers,
      airTableTags,
      airtableProjects,
    ] = await Promise.all([
      load<AirTablePartner>('Partners'),
      load<AirTableVolunteer>('Volunteers'),
      load<AirTableTag>('Tags'),
      load<AirTableProject>('Projects'),
    ])

    createPartnerSourceNodes(transformPartners(airTablePartners))
    createVolunteerSourceNodes(transformVolunteers(airTableVolunteers))
    createTagSourceNodes(transformTags(airTableTags))
    createProjectSourceNodes(transformProjects(airtableProjects))
  } catch (e) {
    sourceNodesArgs.reporter.panic('Data sourcing failed:', e)
  }
}
