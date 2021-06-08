import { NodeInput, SourceNodesArgs } from 'gatsby'
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
  const haveAirtableConfig = options.airtableApiKey && options.airtableBaseUrl
  const forceMockMode = options.forceMockMode
  const useMockData = forceMockMode || !haveAirtableConfig

  if (useMockData) {
    const msg = forceMockMode
      ? 'Mock data ENV var enabled. Using internal mock data instead.'
      : 'Airtable config missing or incomplete, using internal mock data instead.'
    sourceNodesArgs.reporter.warn(msg)
    importNodes(sourceNodesArgs, getMockPartners(), nodeFromPartner)
    importNodes(sourceNodesArgs, getMockVolunteers(), nodeFromVolunteer)
    importNodes(sourceNodesArgs, getMockTags(), nodeFromTag)
    importNodes(sourceNodesArgs, getMockProjects(), nodeFromProject)
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

    importNodes(
      sourceNodesArgs,
      transformPartners(airTablePartners),
      nodeFromPartner
    )
    importNodes(
      sourceNodesArgs,
      transformVolunteers(airTableVolunteers),
      nodeFromVolunteer
    )
    importNodes(sourceNodesArgs, transformTags(airTableTags), nodeFromTag)
    importNodes(
      sourceNodesArgs,
      transformProjects(airtableProjects),
      nodeFromProject
    )
  } catch (e) {
    sourceNodesArgs.reporter.panic('Data sourcing failed:', e)
  }
}

function importNodes<T extends object>( // eslint-disable-line
  sourceNodesArgs: SourceNodesArgs,
  values: T[],
  importer: (value: T, digest: string) => NodeInput
): void {
  const {
    actions: { createNode },
    createContentDigest,
  } = sourceNodesArgs
  values.forEach((value) => {
    const digest = createContentDigest(value)
    createNode(importer(value, digest))
  })
}
