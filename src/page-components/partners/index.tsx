import React from 'react'
import { Layout, Section, SectionContent } from 'components/layout'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import * as S from './styles'
import FinancialPartners from './sections/financial'

export const NAVIGATION_KEY = 'pages.partners.navigation.partners'

const PartnersPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Layout
      crumbs={[{ label: t(NAVIGATION_KEY) }]}
      seo={{
        title: t('pages.partners.metadata.title'),
        description: t('pages.partners.metadata.description'),
      }}
    >
      <Section>
        <SectionContent>
          <S.Heading>{t('pages.partners.title')}</S.Heading>
          <S.Tagline>{t('pages.partners.description')}</S.Tagline>
        </SectionContent>
      </Section>
      <FinancialPartners />
    </Layout>
  )
}

export default PartnersPage
