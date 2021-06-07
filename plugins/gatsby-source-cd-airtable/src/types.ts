//
// Base types
//

export interface SourceNode {
  rowId: string
}

export interface AirTableRecord {
  id: string
  fields: Record<string, unknown>
}

export interface PluginOptions {
  airtableApiKey: string
  airtableBaseUrl: string
  forceMockMode: boolean
}

export interface Partner extends SourceNode {
  name: string
  url: string
  logoUrl: string
}

//
// Airtable row types
//

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

//
// Projects
//

export enum Language {
  Czech = 'cs',
  English = 'en',
}

export interface Tag extends SourceNode {
  name: string
  slug: string
  lang: Language
}

export interface Volunteer extends SourceNode {
  name: string
  profilePictureUrl?: string
  email: string
  company: string
}

export interface Project extends SourceNode {
  name: string
  tagline: string
  lang: Language
  slug: string
  coverUrl: string
  logoUrl: string
  highlighted: boolean
  tags: string[]
  description: string
  finished: boolean
  contributeText: string
  trelloUrl?: string
  githubUrl?: string
  url: string
  coordinators: string[]
}
