import React, { useContext } from 'react'
import { Layout, Section, SectionContent } from 'components/layout'
import { Link } from 'components/links'
import { ThemeContext } from 'styled-components'

const IndexPage: React.FC = () => {
  const theme = useContext(ThemeContext)
  return (
    <Layout>
      <Section>
        <SectionContent>
          <h1>Česko.Digital</h1>
          <p>Hello World</p>
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
