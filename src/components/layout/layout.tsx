import React, { ReactNode } from 'react'

import Head from 'components/head'
import Header from './header'
import Footer from './footer'

export interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => (
  <>
    <Head />
    <Header />
    <main>{children}</main>
    <Footer />
  </>
)

export default Layout
