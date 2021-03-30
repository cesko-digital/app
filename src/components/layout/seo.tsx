import React, { useContext } from 'react'
import Helmet from 'react-helmet'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { TranslateUrlsContext } from 'gatsby-plugin-translate-urls'
import { insertIf } from 'utils/insert-if'

export interface SeoProps {
  description?: string
  title?: string
  coverUrl?: string
}

export const Seo: React.FC<SeoProps> = ({
  description,
  title,
  coverUrl = 'https://data.cesko.digital/web/metadata-cover.png',
}: SeoProps) => {
  const { locale } = useContext(TranslateUrlsContext)
  const { t } = useTranslation()
  const metaDescription = description || t('metadata.description')

  const metadataTitle = t('metadata.title')
  return (
    <Helmet
      htmlAttributes={{
        lang: locale,
      }}
      title={title}
      defaultTitle={metadataTitle}
      titleTemplate={'%s | Česko.Digital'}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:image',
          content: coverUrl,
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:creator',
          content: metadataTitle,
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          name: 'twitter:image',
          content: coverUrl,
        },
        ...insertIf({
          condition: process.env.GATSBY_NO_INDEX === 'true',
          elements: [{ name: 'robots', content: 'noindex, nofollow' }],
        }),
      ].concat()}
    />
  )
}

export default Seo
