import { graphql } from 'gatsby'

export const query = graphql`
  query Partners {
    partners: allPartner {
      nodes {
        name
        url
        logoUrl
      }
    }
  }
`

export { default } from 'page-components/partners'
