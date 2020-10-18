/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

interface SiteMetadata {
  description: string
  title: string
  author: string
}

export type GraphQLData = {
  site: {
    siteMetadata: SiteMetadata
  }
}

interface PureSEOProps {
  data: GraphQLData
  description?: string
  lang?: string
  meta?: []
  title?: string
}

interface SEOProps {
  description?: string
  lang?: string
  meta?: []
  title: string
}

export const PureSEO: React.FC<PureSEOProps> = ({
  data,
  description,
  lang,
  title,
}: PureSEOProps) => {
  const metaDescription = description || data.site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${data.site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: data.site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat()}
    />
  )
}

const SEO: React.FC<SEOProps> = ({ description }: SEOProps) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  return <PureSEO data={data} description={description} />
}

export default SEO
