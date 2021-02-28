export const Project = `

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
  }
`
