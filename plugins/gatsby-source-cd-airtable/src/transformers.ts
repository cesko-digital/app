import {
  Language,
  Project,
  Tag,
  Volunteer,
  Partner,
  SourceNode,
  Event,
  Opportunity,
} from './types'
import {
  AirTablePartner,
  AirTableProject,
  AirTableTag,
  AirTableVolunteer,
  AirTableRecord,
  AirtableEvent,
  AirtableOpportunity,
} from './airtable'
import { Marked, Renderer } from '@ts-stack/markdown'

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
        silent,
        slackChannelName,
        slackChannelUrl,
        trelloUrl,
        url,
      } = airTableProject.fields

      const base = {
        tags: tags || [],
        highlighted: !!highlighted,
        finished: !!finished,
        silent: !!silent,
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
  Marked.setOptions({
    renderer: new Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
  })

  const f = event.fields
  const safeSlug = f.Slug ? f.Slug : event.id
  return {
    rowId: event.id,
    name: f.Name,
    summary: f.Summary,
    description: Marked.parse(f.Description),
    competenceMap: f['Competence Map'],
    startTime: new Date(f['Start Time']),
    endTime: new Date(f['End Time']),
    status: f.Status,
    owner: f.Owner ? f.Owner[0] : undefined,
    project: f.Project?.length > 0 ? f.Project[0] : undefined,
    tags: f.Tags ? f.Tags : [],
    slug: safeSlug,
    rsvpUrl: f['RSVP URL'],
    rsvpTitle: f['RSVP Title'] ? f['RSVP Title'] : 'Zajímá mě to',
    coverUrl: f['Cover URL'],
    locationTitle: f['Location Title'],
    locationUrl: f['Location URL'],
  }
}

export function transformOpportunity(
  opportunity: AirtableOpportunity
): Opportunity | null {
  const f = opportunity.fields
  return {
    rowId: opportunity.id,
    slug: opportunity.id,
    name: f.Name ?? '',
    project: f.Project?.length > 0 ? f.Project[0] : undefined,
    coverUrl: f['Cover URL'],
    summary: f.Summary ?? '',
    timeRequirements: f['Time Requirements'],
    skills: f['Skills'],
    starred: f.Starred || false,
    juniorFriendly: f['Junior Friendly'] || false,
    owner: f.Owner ? f.Owner[0] : undefined,
    contactUrl: f['RSVP URL'],
    status: f.Status,
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
