import { AirTableProject } from './interfaces/airtable-project'
import { Project } from './interfaces/project'

export const transformProject = (airTableProject: AirTableProject): Project => {
  return {
    originalId: airTableProject.id,
    name: airTableProject.fields.Name,
    tagline: airTableProject.fields['Tagline CS'] ?? null,
  }
}
