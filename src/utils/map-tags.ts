import { Tag } from 'generated/graphql-types'

export const mapTags = (tags: Tag[]): string[] => tags.map((tag) => tag.slug)
