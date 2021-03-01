import React from 'react'
import { Layout, Section, SectionContent } from 'components/layout'
import { graphql } from 'gatsby'
import { Heading1 } from 'components/typography'
import { Project } from 'generated/graphql-types'
import { AboutProject } from './components/about'
import * as S from './styles'
import { Volunteer } from './components/volunteers'

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
  return (
    <Layout>
      <Section>
        <SectionContent>
          <Heading1>
            Hello, I am {data.project.name} in{' '}
            {data.project.lang === 'en' ? '🇺🇸' : '🇨🇿'}
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
            <S.ProjectCardWrapper>Project card goes here</S.ProjectCardWrapper>
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
