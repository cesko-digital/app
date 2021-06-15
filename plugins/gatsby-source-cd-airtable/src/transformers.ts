import {
  Language,
  Project,
  Tag,
  Volunteer,
  Partner,
  SourceNode,
  Event,
} from './types'
import {
  AirTablePartner,
  AirTableProject,
  AirTableTag,
  AirTableVolunteer,
  AirTableRecord,
  AirtableEvent,
} from './airtable'

function transformAirTableRecords<
  AirTableType extends AirTableRecord,
  Type extends SourceNode
>(airTableRecords: AirTableType[]): Type[] {
  return airTableRecords.map(
    (record) =>
      ({
        rowId: record.id,
        ...record.fields,
      } as Type)
  )
}

export function transformProjects(
  airtableProjects: AirTableProject[]
): Project[] {
  return airtableProjects
    .filter((airtableProject) => !airtableProject?.fields?.draft)
    .map((airTableProject) => {
      const {
        csTagline,
        tags,
        csName,
        coverUrl,
        csSlug,
        highlighted,
        logoUrl,
        csContributeText,
        csDescription,
        githubUrl,
        coordinators,
        finished,
        slackChannelName,
        slackChannelUrl,
        trelloUrl,
        url,
      } = airTableProject.fields

      const base = {
        tags: tags || [],
        highlighted: !!highlighted,
        finished: !!finished,
        coverUrl,
        logoUrl,
        trelloUrl,
        githubUrl,
        slackChannelUrl,
        slackChannelName,
        url,
        rowId: airTableProject.id,
        coordinators: coordinators || [],
      }

      const csProject: Project = {
        ...base,
        name: csName || '',
        tagline: csTagline || '',
        slug: csSlug,
        description: csDescription || '',
        contributeText: csContributeText || '',
        lang: Language.Czech,
      }

      return [csProject]
    })
    .reduce(
      (projects: Project[], langProjects) => [...projects, ...langProjects],
      []
    )
}

export function transformTags(airTableTags: AirTableTag[]): Tag[] {
  return airTableTags
    .map((airTableTag) => {
      const { csName, enSlug, enName, csSlug } = airTableTag.fields
      const base = {
        rowId: airTableTag.id,
      }
      return [
        {
          ...base,
          name: enName,
          slug: enSlug,
          lang: Language.English,
        },
        {
          ...base,
          name: csName,
          slug: csSlug,
          lang: Language.Czech,
        },
      ]
    })
    .reduce((tags: Tag[], langTags) => [...tags, ...langTags], [])
}

export function transformEvent(event: AirtableEvent): Event | null {
  const f = event.fields
  return {
    rowId: event.id,
    name: f.Name,
    summary: f.Summary,
    description: f.Description,
    competenceMap: parseCompetenceMap(f['Competence Map']),
    startTime: new Date(f['Start Time']),
    endTime: new Date(f['End Time']),
    status: f.Status,
    owner: f.Owner[0],
    project: f.Project.length > 0 ? f.Project[0] : undefined,
    tags: f.Tags,
  }
}

export function parseCompetenceMap(src: string[]): Record<string, number> {
  const map: Record<string, number> = {}
  for (const competence of src) {
    const [name, score] = competence.split(':')
    if (name && !isNaN(parseInt(score))) {
      map[name] = parseInt(score)
    }
  }
  return map
}

export const transformVolunteers = (
  airTableVolunteers: AirTableVolunteer[]
): Volunteer[] => transformAirTableRecords(airTableVolunteers)

export const transformPartners = (
  airTablePartners: AirTablePartner[]
): Partner[] => transformAirTableRecords(airTablePartners)

interface IdParams {
  lang: string
  rowId: string
}

export const getProjectId = ({ lang, rowId }: IdParams): string =>
  `${lang}-Project-${rowId}`

export const getTagId = ({ lang, rowId }: IdParams): string =>
  `${lang}-Tag-${rowId}`

export const getVolunteerId = (rowId: string): string => `Volunteer-${rowId}`
