import React from 'react'

import { Layout, Section, SectionContent } from 'components/layout'
import SEO from 'components/seo'

const NotFoundPage: React.FC = () => (
  <Layout>
    <Section>
      <SectionContent>
        <SEO title="404: Not found" />
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </SectionContent>
    </Section>
  </Layout>
)

export default NotFoundPage
