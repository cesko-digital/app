import React, { ReactNode } from 'react'

import Head from 'components/head'
import Header from './header'
import Footer from './footer'
import * as S from './styles'

export interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <S.Container>
      <Head />
      <Header />
      <main>{children}</main>
      <Footer />
    </S.Container>
  )
}

export default Layout
