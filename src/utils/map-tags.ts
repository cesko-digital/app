import { Tag } from 'generated/graphql-types'

export const mapTags = (tags: Pick<Tag, 'slug'>[]): string[] =>
  tags.map((tag) => tag.slug)
