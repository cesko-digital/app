/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import { Theme } from '../theme'

interface IProps {
  children?: any
}

const Layout = ({ children }: IProps) => {
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

      <footer>Copyright &copy; {data.site.siteMetadata.title}</footer>
    </Theme>
  )
}

export default Layout
