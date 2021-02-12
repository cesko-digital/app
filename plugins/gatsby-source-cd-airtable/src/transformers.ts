import { AirTableProject, AirTableTag } from './interfaces/airtable-project'
import { Project, Tag } from './interfaces/project'

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
      } = airTableProject.fields

      const base = {
        tags: tags || [],
        highlighted: !!highlighted, // Field can be missing in AirTable record
        coverUrl,
        logoUrl,
        rowId: airTableProject.id,
      }

      return [
        {
          ...base,
          name: enName,
          tagline: enTagline,
          slug: enSlug,
          lang: 'en',
        },
        {
          ...base,
          name: csName,
          tagline: csTagline,
          slug: csSlug,
          lang: 'cs',
        },
      ]
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
          lang: 'en',
        },
        {
          ...base,
          name: csName,
          slug: csSlug,
          lang: 'cs',
        },
      ]
    })
    .reduce((tags: Tag[], langProjects) => [...tags, ...langProjects], [])
}

interface IdParams {
  lang: string
  rowId: string
}

export const getProjectId = ({ lang, rowId }: IdParams): string =>
  `${lang}-Project-${rowId}`

export const getTagId = ({ lang, rowId }: IdParams): string =>
  `${lang}-Tag-${rowId}`
