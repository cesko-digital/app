import { graphql } from 'gatsby'

export const query = graphql`
  query PortalDobrovolnikaPage($locale: String!) {
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
        rsvpTitle
        slug
        coverUrl
      }
    }
    roles: allOpportunity(limit: 3, filter: { status: { eq: "live" } }) {
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
    cedu: allMarkdownRemark {
      nodes {
        frontmatter {
          cover
          description
          date
          slug
          tableOfContent {
            time
            title
            start
          }
          sources {
            title
            type
            url
          }
          title
          videoUrl
          credits {
            title
            name
          }
          tags
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

export { default } from 'page-components/portal-dobrovolnika'
