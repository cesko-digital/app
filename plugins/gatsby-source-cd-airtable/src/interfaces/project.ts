import { SourceNode } from './source-node'

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
