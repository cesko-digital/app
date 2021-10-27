import { graphql } from 'gatsby'

export const query = graphql`
  query Partners($locale: String!) {
    ...FinancialPartners
    ...ExpertPartners
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

export { default } from 'page-components/partners'
