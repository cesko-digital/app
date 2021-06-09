import fetch from 'node-fetch'

//
// Airtable Record Types
//

export interface AirTableRecord {
  id: string
  fields: Record<string, unknown>
}

export interface AirTablePartner extends AirTableRecord {
  fields: {
    name: string
    url: string
    logoUrl: string
  }
}

export interface AirTableProject extends AirTableRecord {
  fields: {
    draft?: boolean
    csName: string
    enName: string
    csSlug: string
    enSlug: string
    csTagline: string
    enTagline: string
    highlighted?: boolean
    tags: string[]
    logoUrl: string
    coverUrl: string
    finished?: boolean
    slackChannelUrl: string
    slackChannelName: string
    githubUrl?: string
    trelloUrl?: string
    url: string
    csContributeText: string
    enContributeText: string
    csDescription: string
    enDescription: string
    coordinators: string[]
  }
}

export interface AirTableTag extends AirTableRecord {
  fields: {
    csName: string
    enName: string
    csSlug: string
    enSlug: string
  }
}

export interface AirTableVolunteer extends AirTableRecord {
  fields: {
    name: string
    company: string
    email: string
    profilePictureUrl?: string
  }
}

export interface AirtableEvent extends AirTableRecord {
  fields: {
    'Live URL': string
    'End Time': string
    'RSVP URL': string
    'Summary': string
    'Description': string
    'Name': string
    'Status'?: 'draft' | 'live' | 'archived'
    'Follow-up URL': string
    'Competence Map': string[]
    'RSVP Deadline': string
    'Start Time': string
  }
}

//
// Helpers
//

export async function getAllAirtableRecords<T>(
  airtableApiKey: string,
  airtableBaseUrl: string,
  tableName: string
): Promise<T[]> {
  const response = await fetch(`${airtableBaseUrl}/${tableName}`, {
    headers: {
      Authorization: `Bearer ${airtableApiKey}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Loading data from ${tableName} failed.`)
  }

  const data: { records: T[] } = await response.json()
  return data.records
}
