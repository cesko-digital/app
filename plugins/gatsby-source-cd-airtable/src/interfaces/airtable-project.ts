export interface AirTableProject {
  id: string
  fields: {
    csName: string
    enName: string
    csSlug: string
    enSlug: string
    csTagline: string
    enTagline: string
    highlighted?: boolean
    tags: string[]
    logoUrl: string
    coverUrl: string
    progress: number
    slackChannelUrl: string
    slackChannelName: string
    githubUrl?: string
    trelloUrl?: string
    url: string
    csContributeText: string
    enContributeText: string
    csDescription: string
    enDescription: string
    lead: string[]
    projectRoles: string[]
  }
}

export interface AirTableTag {
  id: string
  fields: {
    csName: string
    enName: string
    csSlug: string
    enSlug: string
  }
}

export interface AirTableVolunteer {
  id: string
  fields: {
    name: string
    company: string
    email: string
    profilePictureUrl?: string
  }
}

export interface AirTableProjectRole {
  id: string
  fields: {
    csName: string
    enName: string
    volunteer: string[]
  }
}
