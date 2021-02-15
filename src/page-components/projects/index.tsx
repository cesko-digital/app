import React from 'react'
import { Layout, Section, SectionContent } from 'components/layout'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { HighlightedProject, OngoingProject } from './sections'
import { JoinUs } from 'components/sections'
import { Project } from 'pages/projects'
import { mapTags } from './utils/map-tags'

// Data are coming from page query defined in 'pages/project.tsx'
interface ProjectsPageProps {
  data: {
    otherProjects: {
      nodes: Project[]
    }
    highlightedProject?: Project | null
  }
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({
  data,
}: ProjectsPageProps) => {
  const { t } = useTranslation()
  const { otherProjects, highlightedProject } = data

  return (
    <Layout crumbs={[{ label: t('pages.projects.navigation.projects') }]}>
      <Section>
        <SectionContent>
          <h1>{t('pages.projects.title')}</h1>
          <p>{t('pages.projects.description')}</p>
        </SectionContent>
      </Section>
      <Section>
        <SectionContent>
          <h2>{t('pages.projects.ongoing')}</h2>
          {highlightedProject && (
            <HighlightedProject
              cover={highlightedProject.coverUrl}
              logo={highlightedProject.logoUrl}
              description={highlightedProject.tagline}
              title={highlightedProject.name}
              tags={mapTags(highlightedProject.tags)}
              link={`/projects/${highlightedProject.slug}`}
            />
          )}
          <OngoingProject projects={otherProjects.nodes} />
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
