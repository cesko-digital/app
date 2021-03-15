import { Layout, Section, SectionContent } from 'components/layout'
import { Link } from 'components/links'
import { JoinUs } from 'components/sections'
import { Hero, OurValues, Numbers } from './sections'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

const IndexPage: React.FC = () => {
  const { t } = useTranslation()
  const theme = useContext(ThemeContext)

  return (
    <Layout>
      <Section>
          <Hero />
      </Section>

      <Numbers />

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
