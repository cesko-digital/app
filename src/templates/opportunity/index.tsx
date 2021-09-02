import React from 'react'
import { Layout, Section, SectionContent } from '../../components/layout'

interface OpportunityPageProps {
}

const OpportunityPage: React.FC<OpportunityPageProps> = ({}) => {
  return (
    <Layout
      crumbs={[
        { path: '/portal-dobrovolnika', label: 'Portál dobrovolníka' },
        { label: "TBD" },
      ]}
      seo={{
        title: "TBD",
        description: "TBD",
        coverUrl: "TBD",
      }}
    >
      <Section>
        <SectionContent>
            Here be dragons.
        </SectionContent>
      </Section>
    </Layout>
  )
}

export default OpportunityPage
