import React from 'react'
import { Layout, Section, SectionContent } from 'components/layout'
import { graphql } from 'gatsby'
import { Heading1 } from 'components/typography'
import { ProjectPageQuery } from 'generated/graphql-types'
import * as S from './styles'
import AboutProject from './components/about'
import ProjectCard from './components/project-card'
import Contribute from './components/contribute'
import { NAVIGATION_KEY as PROJECT_PAGE_NAVIGATION_KEY } from 'page-components/projects'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { Projects } from 'components/sections'
import { getResizedImgUrl } from 'utils/get-resized-img-url'

interface ProjectPageProps {
  data: ProjectPageQuery
}

const ProjectPage: React.FC<ProjectPageProps> = ({ data }) => {
  const { t } = useTranslation()
  const {
    name,
    url,
    trelloUrl,
    githubUrl,
    coverUrl,
    tagline,
    coordinators,
    finished,
    description,
    slackChannelUrl,
    slackChannelName,
    contributeText,
  } = data.project
  const otherProjects = data.otherProjects.nodes
  return (
    <Layout
      crumbs={[
        { path: '/projects', label: t(PROJECT_PAGE_NAVIGATION_KEY) },
        { label: name },
      ]}
      seo={{ title: name, description: tagline, coverUrl }}
    >
      <Section>
        <SectionContent>
          <Heading1>{name}</Heading1>
          <S.Tagline>{tagline}</S.Tagline>
          <S.CoverImageWrapper>
            <S.CoverImage
              src={getResizedImgUrl(coverUrl, 1160)}
              loading="lazy"
            />
          </S.CoverImageWrapper>
        </SectionContent>
      </Section>
      <Section>
        <SectionContent>
          <S.AboutSectionWrapper>
            <S.DescriptionWrapper>
              <AboutProject
                finished={finished}
                thankYouText={contributeText} // Using same field when project finished
                description={description}
              />
            </S.DescriptionWrapper>
            <S.ProjectCardWrapper>
              <ProjectCard
                githubUrl={githubUrl}
                name={name}
                url={url}
                coordinators={coordinators}
                slackChannelName={slackChannelName}
                slackChannelUrl={slackChannelUrl}
                trelloUrl={trelloUrl}
              />
            </S.ProjectCardWrapper>
          </S.AboutSectionWrapper>
        </SectionContent>
      </Section>
      {!finished && (
        <Section>
          <SectionContent>
            <S.ContributeWrapper>
              <Contribute contributeText={contributeText} />
            </S.ContributeWrapper>
          </SectionContent>
        </Section>
      )}
      <Section>
        <SectionContent>
          <Projects projects={otherProjects} otherProjects={true} />
        </SectionContent>
      </Section>
    </Layout>
  )
}

export const query = graphql`
  query ProjectPage($id: String!, $locale: String!) {
    project(id: { eq: $id }) {
      name
      description
      slackChannelName
      slackChannelUrl
      finished
      tagline
      coverUrl
      githubUrl
      trelloUrl
      url
      contributeText
      coordinators {
        name
        company
        profilePictureUrl
      }
    }
    otherProjects: allProject(filter: { id: { ne: $id } }, limit: 3) {
      nodes {
        name
        tagline
        coverUrl
        logoUrl
        slug
        tags {
          name
          slug
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

export default ProjectPage
