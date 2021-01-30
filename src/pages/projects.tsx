import React from 'react'
import { graphql } from 'gatsby'
import { Project } from '../../plugins/gatsby-source-cd-airtable/src/interfaces/project'
import { JoinUs } from 'components/sections'
import { Layout, Section, SectionContent } from 'components/layout'
import { useTranslation } from 'gatsby-plugin-react-i18next'

interface ProjectsPageProps {
  data: {
    allProject: {
      edges: {
        node: Project
      }[]
    }
  }
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({
  data,
}: ProjectsPageProps) => {
  const { t } = useTranslation()
  return (
    <Layout crumbs={[{ label: t('pages.projects.navigation.projects') }]}>
      <Section>
        <SectionContent>
          <h1>{t('pages.projects.title')}</h1>
          <p>{t('pages.projects.description')}</p>
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
        </SectionContent>
      </Section>

      <Section>
        <SectionContent>
          <JoinUs />
        </SectionContent>
      </Section>
    </Layout>
  )
}

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
