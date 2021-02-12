import React from 'react'
import { graphql } from 'gatsby'
import { Project } from '../../plugins/gatsby-source-cd-airtable/src/interfaces/project'
import { JoinUs } from 'components/sections'
import { Layout, Section, SectionContent } from 'components/layout'
import { useTranslation } from 'gatsby-plugin-react-i18next'

interface ProjectsPageProps {
  data: {
    allProject: {
      nodes: Project[]
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
            {data.allProject.nodes.map((project) => (
              <li key={project.slug}>
                <ul data-cy="project">
                  <li data-cy="project__name">{project.name}</li>
                  <li data-cy="project__tagline">{project.tagline}</li>
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

export default ProjectsPage
