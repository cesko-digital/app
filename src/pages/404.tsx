import React from 'react'
import { graphql } from 'gatsby'

import { Layout, Section, SectionContent } from 'components/layout'

const NotFoundPage: React.FC = () => (
  <Layout seo={{ title: '404 - Not Found' }}>
    <Section>
      <SectionContent>
        <h1>404 NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </SectionContent>
    </Section>
  </Layout>
)

export const query = graphql`
  query NotFound {
    locales: allLocale(filter: { language: { eq: "cs" } }) {
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

export default NotFoundPage
