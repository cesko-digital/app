import React from 'react'

import { Layout, Section, SectionContent } from 'components/layout'

const NotFoundPage: React.FC = () => (
  <Layout seo={{ title: '404 - Not Found' }}>
    <Section>
      <SectionContent>
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </SectionContent>
    </Section>
  </Layout>
)

export default NotFoundPage
