import { graphql } from 'gatsby'

export const query = graphql`
  query Homepage($language: String!) {
    projects: allProject(limit: 3) {
      nodes {
        name
        slug
        tagline
        coverUrl
        logoUrl
        tags {
          rowId
          slug
          name
        }
      }
    }
    partners: allPartner(filter: { category: { eq: "homepage" } }) {
      nodes {
        name
        url
        logoUrl
      }
    }
    locales: allLocale(filter: { language: { eq: $language } }) {
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

export { default } from 'page-components/homepage'
