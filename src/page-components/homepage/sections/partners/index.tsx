import React from 'react'
import * as S from './styles'
import { Partner } from 'generated/graphql-types'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import LogoList from 'components/logo-list'

interface PartnersProps {
  partners: Pick<Partner, 'name' | 'logoUrl' | 'url'>[]
}

const Partners: React.FC<PartnersProps> = ({ partners }) => {
  const { t } = useTranslation()
  return (
    <>
      <S.MainTitle>{t('pages.homepage.sections.partners.title')}</S.MainTitle>
      <LogoList
        logos={partners.map((partner) => ({
          name: partner.name,
          linkUrl: partner.url,
          logoUrl: partner.logoUrl,
        }))}
      />
    </>
  )
}

export default Partners
