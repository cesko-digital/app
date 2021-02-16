import { graphql } from 'gatsby'
export interface Tag {
  rowId: string
  name: string
  slug: string
  lang: string
}

export interface Project {
  rowId: string
  name: string
  tagline: string
  lang: string
  slug: string
  coverUrl: string
  logoUrl: string
  highlighted: boolean
  tags: Tag[]
}

// Page query needs to be in 'pages' directory
export const query = graphql`
  query($locale: String!) {
    highlightedProject: project(
      highlighted: { eq: true }
      lang: { eq: $locale }
    ) {
      name
      rowId
      lang
      slug
      tagline
      coverUrl
      logoUrl
      highlighted
      tags {
        rowId
        slug
        name
        lang
      }
    }
    otherProjects: allProject(
      filter: { highlighted: { eq: false }, lang: { eq: $locale } }
    ) {
      nodes {
        name
        rowId
        lang
        slug
        tagline
        coverUrl
        logoUrl
        highlighted
        tags {
          rowId
          slug
          name
          lang
        }
      }
    }
  }
`

export { default } from 'page-components/projects'
