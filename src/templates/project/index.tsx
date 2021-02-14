import React from 'react'
import { Layout, Section, SectionContent } from 'components/layout'
import { graphql } from 'gatsby'
import { Heading1 } from 'components/typography'
import { Project } from 'generated/graphql-types'
import AboutProject from './components/about'
import * as S from './styles'
import { Volunteer } from './components/about/volunteers'
import ProjectCard from './components/project-card'
import { NAVIGATION_KEY as PROJECT_PAGE_NAVIGATION_KEY } from 'page-components/projects'
import { useTranslation } from 'gatsby-plugin-react-i18next'

interface ProjectPageProps {
  data: {
    project: Pick<Project, 'name' | 'lang'>
  }
}

const mockedVolunteers: Volunteer[] = Array.from({ length: 8 }).map(
  (val, index) => ({
    name: 'Eva Pavlikova',
    role: 'Project lead',
    profilePictureUrl:
      Math.random() > 0.2
        ? `https://picsum.photos/320?random=${index}`
        : undefined,
  })
)

const ProjectPage: React.FC<ProjectPageProps> = ({ data }) => {
  const { t } = useTranslation()
  const { lang, name } = data.project
  return (
    <Layout
      crumbs={[
        { path: '/projects', label: t(PROJECT_PAGE_NAVIGATION_KEY) },
        { label: name },
      ]}
    >
      <Section>
        <SectionContent>
          <Heading1>
            Hello, I am {name} in {lang === 'en' ? '🇺🇸' : '🇨🇿'}
          </Heading1>
        </SectionContent>
      </Section>
      <Section>
        <SectionContent>
          <S.AboutSectionWrapper>
            <S.DescriptionWrapper>
              <AboutProject
                volunteers={mockedVolunteers}
                description={
                  'Opensource projekt, původně z dílny Ministerstva financí ČR, přináší přehlednou vizualizaci rozpočtu obce s detailními daty až na úroveň jednotlivých faktur a otevírá tím její hospodaření.'
                }
              />
            </S.DescriptionWrapper>
            <S.ProjectCardWrapper>
              <ProjectCard
                githubUrl={'https://github.com/cesko-digital/web'}
                name={name}
                url={'https://github.com/cesko-digital/web'}
                progress={10}
                projectLead={{
                  company: 'Česko.Digital',
                  name: 'Eva Pavlíková',
                  profilePictureUrl:
                    'https://picsum.photos/320?random=${index}',
                }}
                slackChannelName={'projekt'}
                slackChannelUrl={'https://github.com/cesko-digital/web'}
                trelloUrl={'https://github.com/cesko-digital/web'}
              />
            </S.ProjectCardWrapper>
          </S.AboutSectionWrapper>
        </SectionContent>
      </Section>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    project(id: { eq: $id }) {
      name
      lang
    }
  }
`

export default ProjectPage
