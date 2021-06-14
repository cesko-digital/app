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
  competenceMap: Record<string, number>
  startTime: Date
  endTime: Date
  status: 'draft' | 'live' | 'archived' | null
  owner: string
  project?: string
  tags: string[]
}
