import React from 'react'
import { Link } from 'gatsby'
import { JoinUs } from 'components/sections'
import { Layout, Section, SectionContent } from 'components/layout'
import SEO from 'components/seo'

const SecondPage: React.FC = () => (
  <Layout crumbs={[{ label: 'Page 2' }]}>
    <Section>
      <SectionContent>
        <SEO title="Page two" />

        <h1>Hi from the second page</h1>

        <p>Welcome to page 2</p>

        <Link to="/">Go back to the homepage</Link>
      </SectionContent>
    </Section>

    <Section>
      <SectionContent>
        <JoinUs />
      </SectionContent>
    </Section>
  </Layout>
)

export default SecondPage
