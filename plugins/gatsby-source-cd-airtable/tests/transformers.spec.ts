import { transformProjects, transformTags } from '../src/transformers'

describe('transformers', () => {
  describe('transformProjects', () => {
    const csName = 'Projekt'
    const enName = 'Project'
    const csTagline = 'Ahoj světe'
    const enTagline = 'Hello World'
    const coverUrl = 'cover'
    const logoUrl = 'logo'
    const csSlug = 'projekt'
    const enSlug = 'project'
    const tags = ['rowId']
    it('should transform airtable projects to lang version projects', () => {
      const highlighted = true
      const projects = transformProjects([
        {
          id: 'id',
          fields: {
            csName,
            enName,
            csTagline,
            enTagline,
            coverUrl,
            highlighted,
            tags,
            logoUrl,
            csSlug,
            enSlug,
          },
        },
      ])
      expect(projects).toContainEqual({
        lang: 'en',
        name: enName,
        tagline: enTagline,
        tags,
        highlighted,
        logoUrl,
        coverUrl,
        slug: enSlug,
        rowId: 'id',
      })
      expect(projects).toContainEqual({
        lang: 'cs',
        name: csName,
        tagline: csTagline,
        tags,
        highlighted,
        logoUrl,
        coverUrl,
        slug: csSlug,
        rowId: 'id',
      })
    })

    it('should map missing highlighted field to false', () => {
      const projects = transformProjects([
        {
          id: 'id',
          fields: {
            csName,
            enName,
            csTagline,
            enTagline,
            coverUrl,
            tags,
            logoUrl,
            csSlug,
            enSlug,
          },
        },
      ])
      expect(projects).toContainEqual({
        lang: 'en',
        name: enName,
        tagline: enTagline,
        tags,
        highlighted: false,
        logoUrl,
        coverUrl,
        slug: enSlug,
        rowId: 'id',
      })
      expect(projects).toContainEqual({
        lang: 'cs',
        name: csName,
        tagline: csTagline,
        tags,
        highlighted: false,
        logoUrl,
        coverUrl,
        slug: csSlug,
        rowId: 'id',
      })
    })
  })

  describe('transformTags', () => {
    it('should transform airtable tags to lang version tags', () => {
      const csName = 'Aplikace'
      const enName = 'Applications'
      const csSlug = 'aplikace'
      const enSlug = 'applications'
      const tags = transformTags([
        {
          id: 'id',
          fields: {
            csName,
            enName,
            csSlug,
            enSlug,
          },
        },
      ])
      expect(tags).toContainEqual({
        lang: 'cs',
        name: csName,
        slug: csSlug,
        rowId: 'id',
      })
      expect(tags).toContainEqual({
        lang: 'en',
        name: enName,
        slug: enSlug,
        rowId: 'id',
      })
    })
  })
})
