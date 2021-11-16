import { graphql } from 'gatsby'

export const query = graphql`
  query Partners($language: String!) {
    ...FinancialPartners
    ...ExpertPartners
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

export { default } from 'page-components/partners'
