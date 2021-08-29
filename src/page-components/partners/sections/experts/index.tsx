import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { Section, SectionContent } from 'components/layout'
import { Body, Heading2 } from 'components/typography'

const ExpertsPartners: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Section>
      <SectionContent>
        <Heading2>{t('pages.partners.experts.heading.title')}</Heading2>
      </SectionContent>
      <SectionContent>
        <Body>{t('pages.partners.experts.heading.perex')}</Body>
      </SectionContent>
    </Section>
  )
}

export default ExpertsPartners
