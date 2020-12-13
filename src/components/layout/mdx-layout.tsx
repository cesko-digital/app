import React from 'react'
import { Layout, Section, SectionContent } from 'components/layout'

const MdxLayout: React.FC = ({ children }) => (
  <Layout>
    <Section>
      <SectionContent>{children}</SectionContent>
    </Section>
  </Layout>
)

export default MdxLayout
