import { SourceNode } from './source-node'

export interface Project extends SourceNode {
  name: string
  tagline: string | null
}
