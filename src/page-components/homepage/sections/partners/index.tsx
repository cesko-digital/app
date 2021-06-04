import React from 'react'
import * as S from './styles'
import { Partner } from 'generated/graphql-types'
import { useTranslation } from 'gatsby-plugin-react-i18next'

interface PartnersProps {
  partners: Pick<Partner, 'name' | 'logoUrl' | 'url'>[]
}

const Partners: React.FC<PartnersProps> = ({ partners }) => {
  const { t } = useTranslation()
  return (
    <>
      <S.MainTitle>{t('pages.homepage.sections.partners.title')}</S.MainTitle>
      <S.List>
        {partners.map((partner, index) => (
          <S.Item key={index}>
            <S.Link href={partner.url} target="_blank">
              <S.Logo
                alt={`${partner.name} logo`}
                src={partner.logoUrl}
                loading="lazy"
              />
            </S.Link>
          </S.Item>
        ))}
      </S.List>
    </>
  )
}

export default Partners
