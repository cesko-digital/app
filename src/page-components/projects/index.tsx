import React from 'react'
import { Project } from '../../../plugins/gatsby-source-cd-airtable/src/interfaces/project'
import { Layout, Section, SectionContent } from 'components/layout'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { HighlightedProject, OngoingProject } from './sections'
import { JoinUs } from 'components/sections'

// Data are coming from page query defined in 'pages/project.tsx'
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
  const highlightedProject = React.useMemo(() => data.allProject.edges[0], [
    data,
  ])

  const restProjects = React.useMemo(() => data.allProject.edges.slice(1), [
    data,
  ])

  return (
    <Layout crumbs={[{ label: t('pages.projects.navigation.projects') }]}>
      <Section>
        <SectionContent>
          <h1>{t('pages.projects.title')}</h1>
          <p>{t('pages.projects.description')}</p>
          {/* <ul>
            {restProjects.map((project) => (
              <li key={project.node.originalId}>
                <ul data-cy="project">
                  <li data-cy="project__name">{project.node.name}</li>
                  {project.node.tagline && (
                    <li data-cy="project__tagline">{project.node.tagline}</li>
                  )}
                </ul>
              </li>
            ))}
          </ul> */}
        </SectionContent>
      </Section>
      <Section>
        <SectionContent>
          <h2>{t('pages.projects.ongoing')}</h2>
          <HighlightedProject
            projectImageSrc="https://via.placeholder.com/1000x700"
            avatarSrc="https://via.placeholder.com/82"
            tagline={highlightedProject.node.tagline}
            name={highlightedProject.node.name}
            tags={['javascript', 'wordpress', 'covid19']}
            link="#"
          />
          <OngoingProject />
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

export default ProjectsPage
