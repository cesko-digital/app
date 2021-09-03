//
// Base types
//

export interface PluginOptions {
  airtableApiKey: string
  airtableBaseUrl: string
  forceMockMode: boolean
}

export interface SourceNode {
  rowId: string
}

export enum Language {
  Czech = 'cs',
  English = 'en',
}

export interface Partner extends SourceNode {
  name: string
  url: string
  logoUrl: string
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
  slackId?: string
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

export interface Event extends SourceNode {
  name: string
  summary: string
  description: string
  competenceMap: Array<string>
  startTime: Date
  endTime: Date
  status?: string
  owner?: string
  project?: string
  tags: string[]
  rsvpUrl?: string
  rsvpTitle: string
  slug: string
  coverUrl?: string
  locationTitle: string
  locationUrl?: string
}

export interface Opportunity extends SourceNode {
  name: string
  project?: string
  coverUrl?: string
  summary: string
  timeRequirements?: string
  skills: string[]
  starred: boolean
  juniorFriendly: boolean
  owner?: string
  contactUrl?: string
  status?: string
  slug: string
}
