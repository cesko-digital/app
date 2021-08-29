import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { Section, SectionContent } from 'components/layout'
import { Heading2 } from 'components/typography'

const CooperationsPartners: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Section>
      <SectionContent>
        <Heading2>{t('pages.partners.cooperations.heading')}</Heading2>
      </SectionContent>
    </Section>
  )
}

export default CooperationsPartners
