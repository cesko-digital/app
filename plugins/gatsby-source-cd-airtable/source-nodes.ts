import { SourceNodesArgs } from 'gatsby'
import {
  transformProjectRoles,
  transformProjects,
  transformTags,
  transformVolunteers,
} from './src/transformers'
import { PluginOptions } from './src/interfaces/plugin-options'
import { loadData } from './src/load-data'
import {
  AirTableProject,
  AirTableProjectRole,
  AirTableTag,
  AirTableVolunteer,
} from './src/interfaces/airtable-project'
import { ConnectionError } from './src/errors/connection-error'
import {
  createProjectNodesFactory,
  createProjectRoleNodesFactory,
  createTagNodesFactory,
  createVolunteerNodesFactory,
} from './src/create-nodes-factory'
import { getMockProjects } from './src/mocks/mock-projects'
import { getMockTags } from './src/mocks/mock-tags'
import { getMockVolunteers } from './src/mocks/mock-volunteers'
import { getMockProjectRoles } from './src/mocks/mock-project-roles'

export const sourceNodes = async (
  sourceNodesArgs: SourceNodesArgs,
  options: PluginOptions
): Promise<void> => {
  const createVolunteerSourceNodes = createVolunteerNodesFactory(
    sourceNodesArgs
  )
  const createProjectRoleSourceNodes = createProjectRoleNodesFactory(
    sourceNodesArgs
  )
  const createTagSourceNodes = createTagNodesFactory(sourceNodesArgs)
  const createProjectSourceNodes = createProjectNodesFactory(sourceNodesArgs)

  // For Cypress tests, yarn develop fails with NODE_ENV=test
  if (process.env.USE_MOCKS) {
    sourceNodesArgs.reporter.warn(
      'Mock data ENV var enabled. Using internal mock data instead.'
    )

    createVolunteerSourceNodes(getMockVolunteers())
    createProjectRoleSourceNodes(getMockProjectRoles())
    createTagSourceNodes(getMockTags())
    createProjectSourceNodes(getMockProjects())
    return
  }

  try {
    const [
      airTableVolunteers,
      airTableProjectRoles,
      airTableTags,
      airtableProjects,
    ] = await Promise.all([
      loadData<AirTableVolunteer>(options.volunteersTableName),
      loadData<AirTableProjectRole>(options.projectRolesTableName),
      loadData<AirTableTag>(options.tagsTableName),
      loadData<AirTableProject>(options.projectsTableName),
    ])

    const volunteers = transformVolunteers(airTableVolunteers)
    const projectRoles = transformProjectRoles(airTableProjectRoles)
    const tags = transformTags(airTableTags)
    const projects = transformProjects(airtableProjects)

    createVolunteerSourceNodes(volunteers)
    createProjectRoleSourceNodes(projectRoles)
    createTagSourceNodes(tags)
    createProjectSourceNodes(projects)
  } catch (e) {
    if (e instanceof ConnectionError) {
      sourceNodesArgs.reporter.warn(
        'Data sourcing failed because of connection error. Using internal mock data instead.'
      )

      createVolunteerSourceNodes(getMockVolunteers())
      createProjectRoleSourceNodes(getMockProjectRoles())
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
