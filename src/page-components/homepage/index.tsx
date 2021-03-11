import { Layout, Section, SectionContent } from 'components/layout'
import { Link } from 'components/links'
import { JoinUs, Projects } from 'components/sections'
import { OurValues, Numbers } from './sections'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { Heading1, Body } from 'components/typography'
import { HomepageQuery } from 'generated/graphql-types'

interface IndexPageProps {
  data: HomepageQuery
}

const IndexPage: React.FC<IndexPageProps> = ({ data }: IndexPageProps) => {
  const { t } = useTranslation()
  const theme = useContext(ThemeContext)
  const projects = data.projects.nodes

  return (
    <Layout>
      <Section>
        <SectionContent>
          <Heading1>{t('someTranslation')}</Heading1>
          <Body>{t('nested.firstTranslation')}</Body>
        </SectionContent>
      </Section>

      <Section backgroundColor={theme.colors.pebble}>
        <SectionContent verticalPadding={70}>
          <Numbers />
        </SectionContent>
      </Section>

      <Section>
        <SectionContent>
          <Projects projects={projects} />
        </SectionContent>
      </Section>

      <Section>
        <SectionContent>
          <JoinUs />
        </SectionContent>
      </Section>

      <Section backgroundColor={theme.colors.pebble}>
        <SectionContent>
          <OurValues />
        </SectionContent>
      </Section>

      <Section backgroundColor={theme.colors.lightViolet}>
        <SectionContent>
          <Link to="/page-2/">Go to page 2</Link>
        </SectionContent>
      </Section>

      <Section>
        <SectionContent>
          <Link to="/mdx-page">Go to MDX page</Link>
        </SectionContent>
      </Section>
    </Layout>
  )
}

export default IndexPage
