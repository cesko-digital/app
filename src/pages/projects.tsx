import { graphql } from 'gatsby'

// Page query needs to be in 'pages' directory
export const query = graphql`
  query ProjectsPage($locale: String!) {
    highlightedProject: project(highlighted: { eq: true }) {
      name
      slug
      tagline
      coverUrl
      logoUrl
      highlighted
      tags {
        rowId
        slug
        name
      }
    }
    otherProjects: allProject(
      filter: { highlighted: { eq: false }, silent: { eq: false } }
    ) {
      nodes {
        name
        slug
        silent
        tagline
        coverUrl
        logoUrl
        highlighted
        tags {
          rowId
          slug
          name
        }
      }
    }
    locales: allLocale(filter: { language: { eq: $locale } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`

export { default } from 'page-components/projects'
