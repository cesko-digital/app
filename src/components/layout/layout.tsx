import React, { ReactNode } from 'react'

import Head from 'components/head'
import Header from './header'
import Footer from './footer'
import Section from './section'
import SectionContent from './section-content'
import Breadcrumb, { Crumb } from './breadcrumb'
import * as S from './styles'

export interface LayoutProps {
  crumbs?: Crumb[]
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ crumbs, children }: LayoutProps) => {
  return (
    <S.Container>
      <Head />
      <Header />
      {crumbs && (
        <Section>
          <SectionContent>
            <Breadcrumb crumbs={crumbs} />
          </SectionContent>
        </Section>
      )}
      <main>{children}</main>
      <Footer />
    </S.Container>
  )
}

export default Layout
