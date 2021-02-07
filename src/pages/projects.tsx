import { graphql } from 'gatsby'
import { Project } from '../../plugins/gatsby-source-cd-airtable/src/interfaces/project'
export { default } from 'page-components/projects'

interface ProjectsPageProps {
  data: {
    allProject: {
      nodes: Project[]
    }
  }
}

// Page query needs to be in 'pages' directory
export const query = graphql`
  query($locale: String!) {
    allProject(filter: { lang: { eq: $locale } }) {
      nodes {
        name
        slug
        tagline
      }
    }
  }
`
