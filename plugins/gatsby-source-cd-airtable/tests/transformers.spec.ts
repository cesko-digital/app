import {
  transformPartners,
  transformProjects,
  transformTags,
  transformVolunteers,
} from '../src/transformers'
import { AirTableProject } from '../src/airtable'

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
    const coordinators = ['volunteerRowId']
    const csDescription = 'Popis'
    const enDescription = 'Description'
    const csContributeText = 'Zapoj se'
    const enContributeText = 'Contribute'
    const trelloUrl = 'trello'
    const githubUrl = 'github'
    const url = 'url'
    const slackChannelUrl = 'slackUrl'
    const slackChannelName = 'slackName'
    it('should transform airtable projects to gatsby projects', () => {
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
            coordinators,
            csDescription,
            enDescription,
            csContributeText,
            enContributeText,
            trelloUrl,
            githubUrl,
            slackChannelName,
            slackChannelUrl,
            url,
          },
        },
      ])
      expect(projects).toContainEqual({
        name: csName,
        tagline: csTagline,
        tags,
        highlighted,
        logoUrl,
        coverUrl,
        slug: csSlug,
        description: csDescription,
        contributeText: csContributeText,
        trelloUrl,
        slackChannelName,
        slackChannelUrl,
        githubUrl,
        url,
        coordinators,
        rowId: 'id',
        finished: false,
        silent: false,
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
            coordinators,
            csDescription,
            enDescription,
            csContributeText,
            enContributeText,
            trelloUrl,
            githubUrl,
            slackChannelName,
            slackChannelUrl,
            url,
          },
        },
      ])

      expect(projects).toContainEqual({
        name: csName,
        tagline: csTagline,
        tags,
        highlighted: false,
        logoUrl,
        coverUrl,
        slug: csSlug,
        description: csDescription,
        contributeText: csContributeText,
        trelloUrl,
        slackChannelName,
        slackChannelUrl,
        githubUrl,
        url,
        coordinators,
        rowId: 'id',
        finished: false,
        silent: false,
      })
    })

    it('should skip draft project', () => {
      expect(
        transformProjects([
          { id: '1', fields: { draft: true } } as AirTableProject,
        ])
      ).toEqual([])
    })
  })

  describe('transformTags', () => {
    it('should transform airtable tags to gatsby tags', () => {
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
        name: csName,
        slug: csSlug,
        rowId: 'id',
      })
    })
  })
  describe('transformVolunteers', () => {
    it('should transform airtable volunteers to gatsby volunteers', () => {
      const name = 'name'
      const profilePictureUrl = 'url'
      const company = 'company'
      const email = 'email'
      const rowId = 'id'
      const volunteers = transformVolunteers([
        {
          id: rowId,
          fields: {
            name,
            profilePictureUrl,
            company,
            email,
          },
        },
      ])

      expect(volunteers).toEqual([
        { name, profilePictureUrl, company, email, rowId },
      ])
    })
  })

  describe('transformPartners', () => {
    it('should transform airtable partners to gatsby partners', () => {
      const name = 'name'
      const url = 'url'
      const logoUrl = 'logoUrl'
      const rowId = 'id'
      const volunteers = transformPartners([
        {
          id: rowId,
          fields: {
            name,
            url,
            logoUrl,
          },
        },
      ])

      expect(volunteers).toEqual([{ name, url, logoUrl, rowId }])
    })
  })
})
