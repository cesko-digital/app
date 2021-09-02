import { NodeInput, SourceNodesArgs } from 'gatsby'
import {
  transformPartners,
  transformProjects,
  transformTags,
  transformVolunteers,
  transformEvent,
  transformOpportunity,
} from './src/transformers'
import { PluginOptions } from './src/types'
import {
  AirTablePartner,
  AirTableProject,
  AirTableTag,
  AirTableVolunteer,
  AirtableEvent,
  getAllAirtableRecords,
  AirtableOpportunity,
} from './src/airtable'
import {
  nodeFromPartner,
  nodeFromProject,
  nodeFromTag,
  nodeFromVolunteer,
  nodeFromEvent,
  nodeFromOpportunity,
} from './src/node-conversion'
import {
  getMockProjects,
  getMockTags,
  getMockVolunteers,
  getMockPartners,
  getMockEvents,
} from './src/mocks'
import { notEmpty } from './src/utils'

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
    getMockEvents().map(nodeFromEvent).forEach(createNode)
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
      airtableEvents,
      airtableOpportunities,
    ] = await Promise.all([
      load<AirTablePartner>('Partners'),
      load<AirTableVolunteer>('Volunteers'),
      load<AirTableTag>('Tags'),
      load<AirTableProject>('Projects'),
      load<AirtableEvent>('Events'),
      load<AirtableOpportunity>('Opportunities'),
    ])

    transformPartners(airTablePartners).map(nodeFromPartner).forEach(createNode)
    transformVolunteers(airTableVolunteers)
      .map(nodeFromVolunteer)
      .forEach(createNode)
    transformTags(airTableTags).map(nodeFromTag).forEach(createNode)
    transformProjects(airtableProjects).map(nodeFromProject).forEach(createNode)
    airtableEvents
      .map(transformEvent)
      .filter(notEmpty)
      .map(nodeFromEvent)
      .forEach(createNode)
    airtableOpportunities
      .map(transformOpportunity)
      .filter(notEmpty)
      .map(nodeFromOpportunity)
      .forEach(createNode)
  } catch (e) {
    sourceNodesArgs.reporter.panic('Data sourcing failed:', e)
  }
}
