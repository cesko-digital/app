import { AirTableRecord } from './airtable-record'

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
