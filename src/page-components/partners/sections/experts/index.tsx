import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { Section, SectionContent } from 'components/layout'
import { Heading2 } from 'components/typography'
import * as S from '../../styles'

const ExpertsPartners: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Section>
      <SectionContent verticalPadding={60}>
        <Heading2>{t('pages.partners.experts.heading.title')}</Heading2>
        <S.PaddedBody>
          {t('pages.partners.experts.heading.perex')}{' '}
        </S.PaddedBody>
      </SectionContent>
    </Section>
  )
}

export default ExpertsPartners
