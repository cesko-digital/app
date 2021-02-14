import { Tag } from 'pages/projects'

export const mapTags = (tags: Tag[]): string[] =>
  tags.map((tag) => `#${tag.slug}`)
