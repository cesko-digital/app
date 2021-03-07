import {
  AirTableProject,
  AirTableProjectRole,
  AirTableTag,
  AirTableVolunteer,
} from './interfaces/airtable-project'
import {
  Language,
  Project,
  ProjectRole,
  Tag,
  Volunteer,
} from './interfaces/project'

export const transformProjects = (
  airtableProjects: AirTableProject[]
): Project[] => {
  return airtableProjects
    .map((airTableProject) => {
      const {
        csTagline,
        tags,
        enSlug,
        enTagline,
        csName,
        coverUrl,
        csSlug,
        highlighted,
        enName,
        logoUrl,
        csContributeText,
        enContributeText,
        csDescription,
        enDescription,
        githubUrl,
        lead,
        progress,
        slackChannelName,
        slackChannelUrl,
        trelloUrl,
        url,
        projectRoles,
      } = airTableProject.fields

      const base = {
        tags: tags || [],
        highlighted: !!highlighted, // Field can be missing in AirTable record
        coverUrl,
        logoUrl,
        trelloUrl,
        githubUrl,
        slackChannelUrl,
        slackChannelName,
        url,
        progress: progress * 100,
        rowId: airTableProject.id,
        lead: lead[0],
        projectRoles: projectRoles || [],
      }

      const enProject: Project = {
        ...base,
        name: enName,
        tagline: enTagline,
        slug: enSlug,
        description: enDescription,
        contributeText: enContributeText,
        lang: Language.English,
      }
      const csProject: Project = {
        ...base,
        name: csName,
        tagline: csTagline,
        slug: csSlug,
        description: csDescription,
        contributeText: csContributeText,
        lang: Language.Czech,
      }

      return [enProject, csProject]
    })
    .reduce(
      (projects: Project[], langProjects) => [...projects, ...langProjects],
      []
    )
}

export const transformTags = (airTableTags: AirTableTag[]): Tag[] => {
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

export const transformVolunteers = (
  airTableVolunteers: AirTableVolunteer[]
): Volunteer[] => {
  return airTableVolunteers.map((airTableVolunteer) => {
    return {
      rowId: airTableVolunteer.id,
      ...airTableVolunteer.fields,
    }
  })
}

export const transformProjectRoles = (
  airTableProjectRoles: AirTableProjectRole[]
): ProjectRole[] => {
  return airTableProjectRoles
    .map((airTableProjectRole) => {
      const { csName, enName, volunteer } = airTableProjectRole.fields
      const base = {
        rowId: airTableProjectRole.id,
        volunteer: volunteer[0],
      }
      return [
        {
          ...base,
          name: enName,
          lang: Language.English,
        },
        {
          ...base,
          name: csName,
          lang: Language.Czech,
        },
      ]
    })
    .reduce(
      (projectRoles: ProjectRole[], langProjectRoles) => [
        ...projectRoles,
        ...langProjectRoles,
      ],
      []
    )
}

interface IdParams {
  lang: string
  rowId: string
}

export const getProjectId = ({ lang, rowId }: IdParams): string =>
  `${lang}-Project-${rowId}`

export const getTagId = ({ lang, rowId }: IdParams): string =>
  `${lang}-Tag-${rowId}`

export const getVolunteerId = (rowId: string): string => `Volunteer-${rowId}`

export const getProjectRoleId = ({ lang, rowId }: IdParams): string =>
  `${lang}-Volunteer-${rowId}`
