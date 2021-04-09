export const Project = `
  type Volunteer implements Node {
    name: String!
    company: String!
    email: String!
    profilePictureUrl: String
  }

  type Tag implements Node {
    name: String!
    slug: String!
    lang: String!
  }

  type Project implements Node {
    slug: String!
    name: String!
    lang: String!
    tagline: String!
    coverUrl: String!
    logoUrl: String!
    highlighted: Boolean!
    tags: [Tag!]!
    contributeText: String!
    finished: Boolean!
    description: String!
    trelloUrl: String
    githubUrl: String
    slackChannelUrl: String
    slackChannelName: String
    url: String!
    lead: Volunteer!
  }
`
