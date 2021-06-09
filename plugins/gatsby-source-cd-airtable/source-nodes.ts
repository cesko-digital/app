import { NodeInput, SourceNodesArgs } from 'gatsby'
import {
  transformPartners,
  transformProjects,
  transformTags,
  transformVolunteers,
} from './src/transformers'
import { PluginOptions } from './src/types'
import {
  AirTablePartner,
  AirTableProject,
  AirTableTag,
  AirTableVolunteer,
  getAllAirtableRecords,
} from './src/airtable'
import {
  nodeFromPartner,
  nodeFromProject,
  nodeFromTag,
  nodeFromVolunteer,
} from './src/create-nodes-factory'
import {
  getMockProjects,
  getMockTags,
  getMockVolunteers,
  getMockPartners,
} from './src/mocks'

export async function sourceNodes(
  sourceNodesArgs: SourceNodesArgs,
  options: PluginOptions
): Promise<void> {
  const createNode = (node: NodeInput) =>
    sourceNodesArgs.actions.createNode(node)

  const haveAirtableConfig = options.airtableApiKey && options.airtableBaseUrl
  const forceMockMode = options.forceMockMode
  const useMockData = forceMockMode || !haveAirtableConfig

  if (useMockData) {
    const msg = forceMockMode
      ? 'Mock data ENV var enabled. Using internal mock data instead.'
      : 'Airtable config missing or incomplete, using internal mock data instead.'
    sourceNodesArgs.reporter.warn(msg)

    getMockPartners().map(nodeFromPartner).forEach(createNode)
    getMockVolunteers().map(nodeFromVolunteer).forEach(createNode)
    getMockTags().map(nodeFromTag).forEach(createNode)
    getMockProjects().map(nodeFromProject).forEach(createNode)
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

    transformPartners(airTablePartners).map(nodeFromPartner).forEach(createNode)
    transformVolunteers(airTableVolunteers)
      .map(nodeFromVolunteer)
      .forEach(createNode)
    transformTags(airTableTags).map(nodeFromTag).forEach(createNode)
    transformProjects(airtableProjects).map(nodeFromProject).forEach(createNode)
  } catch (e) {
    sourceNodesArgs.reporter.panic('Data sourcing failed:', e)
  }
}
