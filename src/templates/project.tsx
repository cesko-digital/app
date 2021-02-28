import React from 'react'
import { Layout, Section, SectionContent } from 'components/layout'
import { graphql } from 'gatsby'
import { Heading1 } from 'components/typography'
import { Project } from 'generated/graphql-types'

interface ProjectPageProps {
  data: {
    project: Pick<Project, 'name' | 'lang'>
  }
}

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
