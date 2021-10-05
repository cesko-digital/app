import { graphql } from 'gatsby'

export const query = graphql`
  query Partners {
    ...FinancialPartners
    ...ExpertPartners
  }
`

export { default } from 'page-components/partners'
