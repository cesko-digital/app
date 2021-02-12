import { SourceNode } from './source-node'

export interface Tag extends SourceNode {
  name: string
  slug: string
  lang: string
}

export interface Project extends SourceNode {
  name: string
  tagline: string
  lang: string
  slug: string
  coverUrl: string
  logoUrl: string
  highlighted: boolean
  tags: string[]
}
