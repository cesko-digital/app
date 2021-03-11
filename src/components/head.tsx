import Helmet from 'react-helmet'
import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { SiteTitleQuery } from 'generated/graphql-types'

const Head: React.FC = () => {
  const data = useStaticQuery<SiteTitleQuery>(graphql`
    query SiteTitle {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  return (
    <Helmet>
      <html lang="cs" />
      <title>{data.site.siteMetadata.title}</title>
      <meta name="description" content={data.site.siteMetadata.description} />
    </Helmet>
  )
}

export default Head
