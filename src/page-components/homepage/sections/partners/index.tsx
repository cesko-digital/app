import React from 'react'
import * as S from './styles'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import LogoList from 'components/logo-list'
import {
  mapPartnerLogoInfoToLogo,
  PartnerLogoInfo,
} from 'components/logo-list/utils'

interface PartnersProps {
  partners: PartnerLogoInfo[]
}

const Partners: React.FC<PartnersProps> = ({ partners }) => {
  const { t } = useTranslation()
  return (
    <S.Wrapper>
      <S.MainTitle>{t('pages.homepage.sections.partners.title')}</S.MainTitle>
      <LogoList items={partners.map(mapPartnerLogoInfoToLogo)} />
    </S.Wrapper>
  )
}

export default Partners
