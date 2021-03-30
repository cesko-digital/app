import {
  transformPartners,
  transformProjectRoles,
  transformProjects,
  transformTags,
  transformVolunteers,
} from '../src/transformers'
import { AirTableProject } from '../src/interfaces'

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
    const lead = ['leadRowId']
    const projectRoles = ['projectRoleRowId']
    const csDescription = 'Popis'
    const enDescription = 'Description'
    const csContributeText = 'Zapoj se'
    const enContributeText = 'Contribute'
    const trelloUrl = 'trello'
    const githubUrl = 'github'
    const url = 'url'
    const slackChannelUrl = 'slackUrl'
    const slackChannelName = 'slackName'
    const progress = 0.5
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
            lead,
            projectRoles,
            csDescription,
            enDescription,
            csContributeText,
            enContributeText,
            trelloUrl,
            githubUrl,
            progress,
            slackChannelName,
            slackChannelUrl,
            url,
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
        description: enDescription,
        contributeText: enContributeText,
        trelloUrl,
        slackChannelName,
        slackChannelUrl,
        githubUrl,
        url,
        lead: 'leadRowId',
        projectRoles,
        progress: 50,
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
        description: csDescription,
        contributeText: csContributeText,
        trelloUrl,
        slackChannelName,
        slackChannelUrl,
        githubUrl,
        url,
        lead: 'leadRowId',
        projectRoles,
        progress: 50,
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
            lead,
            projectRoles,
            csDescription,
            enDescription,
            csContributeText,
            enContributeText,
            trelloUrl,
            githubUrl,
            progress,
            slackChannelName,
            slackChannelUrl,
            url,
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
        description: enDescription,
        contributeText: enContributeText,
        trelloUrl,
        slackChannelName,
        slackChannelUrl,
        githubUrl,
        url,
        lead: 'leadRowId',
        projectRoles,
        progress: 50,
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
        description: csDescription,
        contributeText: csContributeText,
        trelloUrl,
        slackChannelName,
        slackChannelUrl,
        githubUrl,
        url,
        lead: 'leadRowId',
        projectRoles,
        progress: 50,
        rowId: 'id',
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
  describe('transformVolunteers', () => {
    it('should transform airtable volunteers to single lang volunteers', () => {
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

  describe('transformProjectRoles', () => {
    it('should transform airtable project roles to lang version project roles', () => {
      const csName = 'csName'
      const enName = 'enName'
      const volunteer = 'volunteerRowId'
      const projectRoles = transformProjectRoles([
        {
          id: 'id',
          fields: {
            csName,
            enName,
            volunteer: [volunteer],
          },
        },
      ])
      expect(projectRoles).toContainEqual({
        lang: 'cs',
        name: csName,
        rowId: 'id',
        volunteer,
      })
      expect(projectRoles).toContainEqual({
        lang: 'en',
        name: enName,
        volunteer,
        rowId: 'id',
      })
    })
  })

  describe('transformPartners', () => {
    it('should transform airtable partners to single lang partners', () => {
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
