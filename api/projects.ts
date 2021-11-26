import { VercelRequest, VercelResponse } from '@vercel/node'
import Airtable, { FieldSet } from 'airtable'
import Table from 'airtable/lib/table'

interface AirtableProject {
  csSlug?: string
  csName?: string
  draft?: boolean
  silent?: boolean
  finished?: boolean
  highlighted?: boolean
  tags?: string[]
  csTagline?: string
  logoUrl?: string
  coverUrl?: string
  csDescription?: string
  csContributeText?: string
  url?: string
  trelloUrl?: string
  slackChannelUrl?: string
  gitHubUrl?: string
  coordinators?: string[]
  slackChannelName?: string
}

interface HubProject {
  name: string
  slug: string
  tagline: string
  description: string
  contributeText: string
  projectUrl: string

  isDraft: boolean
  isSilent: boolean
  isFinished: boolean
  isHighlighted: boolean

  tags: string[]

  logoUrl: string
  coverUrl: string

  trelloUrl?: string
  slackChannelUrl?: string
  slackChannelName?: string
  gitHubUrl?: string

  coordinators: HubUser[]
}

interface HubUser {
  name: string
  email: string
  profilePictureUrl: string
}

function parseHubProject(src: AirtableProject): HubProject {
  const requiredKeys: (keyof AirtableProject)[] = [
    'csName',
    'csSlug',
    'csTagline',
    'csDescription',
    'csContributeText',
    'url',
    'logoUrl',
    'coverUrl',
  ]
  for (const key of requiredKeys) {
    if (!src[key]) {
      throw `Chybí hodnota povinného sloupce „${key}“`
    }
  }
  return {
    name: src.csName!,
    slug: src.csSlug!,
    tagline: src.csTagline!,
    description: src.csDescription!,
    contributeText: src.csContributeText!,
    projectUrl: src.url!,
    isDraft: src.draft || false,
    isSilent: src.silent || false,
    isFinished: src.finished || false,
    isHighlighted: src.highlighted || false,
    tags: src.tags || [], // TODO
    logoUrl: src.logoUrl!,
    coverUrl: src.coverUrl!,
    trelloUrl: src.trelloUrl,
    slackChannelUrl: src.slackChannelUrl,
    slackChannelName: src.slackChannelName,
    gitHubUrl: src.gitHubUrl,
    coordinators: [], // TODO
  }
}

interface InvalidRecord<T> {
  error: string
  payload: T
}

function parseAndSort<T, U>(
  sources: T[],
  parser: (src: T) => U
): {
  valid: U[]
  invalid: InvalidRecord<T>[]
} {
  var valid: U[] = []
  var invalid: InvalidRecord<T>[] = []
  for (const item of sources) {
    try {
      valid.push(parser(item))
    } catch (e) {
      invalid.push({ error: `${e}`, payload: item })
    }
  }
  return {
    valid,
    invalid,
  }
}

export default async (
  request: VercelRequest,
  response: VercelResponse
): Promise<void> => {
  try {
    const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
    const table: Table<FieldSet & AirtableProject> = airtable.base(
      'appkn1DkvgVI5jpME'
    )('Projects')
    const records = await table
      .select({
        view: 'Grid view',
        maxRecords: 100,
      })
      .all()
    const airtableProjects = records.map((r) => r.fields)
    response.setHeader('Content-Type', 'application/json')
    response
      .status(200)
      .send(
        JSON.stringify(parseAndSort(airtableProjects, parseHubProject), null, 2)
      )
  } catch (e) {
    response.status(500).send(e)
  }
}
