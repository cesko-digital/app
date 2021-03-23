import React from 'react'
import { Layout, Section, SectionContent } from 'components/layout'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { HighlightedProject, OngoingProjects } from './sections'
import { JoinUs } from 'components/sections'
import * as S from './styles'
import { mapTags } from 'utils/map-tags'
import { ProjectsPageQuery } from 'generated/graphql-types'

// Data are coming from page query defined in 'pages/project.tsx'
interface ProjectsPageProps {
  data: ProjectsPageQuery
}

export const NAVIGATION_KEY = 'pages.projects.navigation.projects'

const ProjectsPage: React.FC<ProjectsPageProps> = ({
  data,
}: ProjectsPageProps) => {
  const { t } = useTranslation()
  const { otherProjects, highlightedProject } = data

  return (
    <Layout
      crumbs={[{ label: t(NAVIGATION_KEY) }]}
      seo={{
        title: t('pages.projects.metadata.title'),
        description: t('pages.projects.metadata.description'),
      }}
    >
      <Section>
        <SectionContent>
          <S.Heading>{t('pages.projects.title')}</S.Heading>
          <S.Tagline>{t('pages.projects.description')}</S.Tagline>
        </SectionContent>
      </Section>
      <Section>
        <SectionContent>
          <S.ProjectsHeading>{t('pages.projects.ongoing')}</S.ProjectsHeading>
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
          <OngoingProjects projects={otherProjects.nodes} />
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
