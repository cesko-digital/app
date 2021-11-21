import { graphql } from 'gatsby'

export const query = graphql`
  query Opportunities($language: String!) {
    opportunities: allOpportunity(filter: { status: { eq: "live" } }) {
      nodes {
        id
        name
        timeRequirements
        skills
        slug
        project {
          name
          logoUrl
          url
        }
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

export { default } from 'page-components/portal-dobrovolnika/opportunities'
