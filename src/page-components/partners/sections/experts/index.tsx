import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { Section, SectionContent } from 'components/layout'
import { Heading2 } from 'components/typography'

const ExpertsPartners: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Section>
      <SectionContent>
        <Heading2>{t('pages.partners.experts.heading')}</Heading2>
      </SectionContent>
    </Section>
  )
}

export default ExpertsPartners
