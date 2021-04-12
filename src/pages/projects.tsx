import { graphql } from 'gatsby'

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
