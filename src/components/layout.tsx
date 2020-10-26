/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from 'gatsby'
import React, { ReactNode } from 'react'

import { Theme } from '../theme'
import { Button, ButtonSize, ButtonType } from './Button'

interface Props {
  children: ReactNode
}

const Layout: React.FC<Props> = ({ children }: Props) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Theme>
      <main>{children}</main>
      <Button>Hello</Button>
      <Button buttonType={ButtonType.Secondary}>Hello</Button>
      <Button size={ButtonSize.Small}>Hello</Button>
      <Button buttonType={ButtonType.Secondary} size={ButtonSize.Small}>Hello</Button>
      <footer>Copyright &copy; {data.site.siteMetadata.title}</footer>
    </Theme>
  )
}

export default Layout
