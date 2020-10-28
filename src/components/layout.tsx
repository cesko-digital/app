/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from 'gatsby'
import React, { ReactNode } from 'react'

import { Theme } from '../theme'
import Button, { ButtonSize } from './Button'
import LinkAsButton from './LinkAsButton'
import Link from './Link'
import ButtonAsLink from './ButtonAsLink'

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
      <Link href="#hi">Link</Link>
      <Link size={ButtonSize.Small} href="#hi">Link</Link>
      <Link disabled href="#hi">Link</Link>
      <Link disabled size={ButtonSize.Small} href="#hi">Link</Link>

      <hr/>

      <LinkAsButton>Link</LinkAsButton>
      <LinkAsButton size={ButtonSize.Small}>Link</LinkAsButton>
      <LinkAsButton disabled>Link</LinkAsButton>
      <LinkAsButton disabled size={ButtonSize.Small}>Link</LinkAsButton>

      <hr/>

      <Button>Link</Button>
      <Button size={ButtonSize.Small}>Link</Button>
      <Button disabled>Link</Button>
      <Button disabled size={ButtonSize.Small}>Link</Button>
      <Button inverted>Link</Button>
      <Button inverted size={ButtonSize.Small}>Link</Button>
      <Button inverted disabled>Link</Button>
      <Button inverted disabled size={ButtonSize.Small}>Link</Button>

      <hr/>

      <ButtonAsLink href="#hi">Link</ButtonAsLink>
      <ButtonAsLink href="#hi" size={ButtonSize.Small}>Link</ButtonAsLink>
      <ButtonAsLink href="#hi" disabled>Link</ButtonAsLink>
      <ButtonAsLink href="#hi" disabled size={ButtonSize.Small}>Link</ButtonAsLink>
      <ButtonAsLink href="#hi" inverted>Link</ButtonAsLink>
      <ButtonAsLink href="#hi" inverted size={ButtonSize.Small}>Link</ButtonAsLink>
      <ButtonAsLink href="#hi" inverted disabled>Link</ButtonAsLink>
      <ButtonAsLink href="#hi" inverted disabled size={ButtonSize.Small}>Link</ButtonAsLink>
      
      <footer>Copyright &copy; {data.site.siteMetadata.title}</footer>
    </Theme>
  )
}

export default Layout
