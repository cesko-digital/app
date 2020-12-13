import React from 'react'
import { graphql } from 'gatsby'
import { Project } from '../../plugins/gatsby-source-cd-airtable/src/interfaces/project'

interface ProjectsPageProps {
  data: {
    allProject: {
      edges: {
        node: Project
      }[]
    }
  }
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ data }: ProjectsPageProps) => (
  <ul>
    {data.allProject.edges.map((project) => (
      <li key={project.node.originalId}>
        <ul data-cy="project">
          <li data-cy="project__name">{project.node.name}</li>
          <li data-cy="project__tagline">{project.node.tagline}</li>
        </ul>
      </li>
    ))}
  </ul>
)

export const query = graphql`
  query {
    allProject {
      edges {
        node {
          name
          tagline
        }
      }
    }
  }
`

export default ProjectsPage
