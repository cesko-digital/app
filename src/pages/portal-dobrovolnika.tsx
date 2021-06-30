import { graphql } from 'gatsby'

export const query = graphql`
  query PortalDobrovolnikaPage {
    events: allEvent(filter: { status: { eq: "live" } }) {
      nodes {
        competenceMap
        description
        endTime
        id
        name
        rowId
        startTime
        status
        summary
        project {
          logoUrl
          name
          id
          coverUrl
          url
          rowId
        }
        owner {
          id
          name
          rowId
        }
        tags {
          id
          lang
          name
          rowId
          slug
        }
        rsvpUrl
        slug
        coverUrl
      }
    }
  }
`

export { default } from 'page-components/portal-dobrovolnika'
