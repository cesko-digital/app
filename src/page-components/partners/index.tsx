import React, { useMemo, useState } from 'react'
import { Layout, Section, SectionContent } from 'components/layout'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import * as S from './styles'
import FinancialPartners from './sections/financial'
import ExpertsPartners from './sections/experts'
import CooperationsPartners from './sections/cooperations'
import Tabs from 'components/tabs'
import { HomepageQuery } from 'generated/graphql-types'

export const NAVIGATION_KEY = 'pages.partners.navigation.partners'

interface PartnersPageProps {
  data: HomepageQuery
}

const PartnersPage: React.FC<PartnersPageProps> = (props) => {
  const { t } = useTranslation()
  const sections = [
    {
      key: 'financial',
      label: t('pages.partners.tabs.financial.title'),
      component: (
        <FinancialPartners
          mainPartnersLogos={props.data.partners.nodes}
          regularPartnersLogos={props.data.partners.nodes}
          grantsLogos={props.data.partners.nodes}
        />
      ),
    },
    {
      key: 'experts',
      label: t('pages.partners.tabs.experts.title'),
      component: <ExpertsPartners />,
    },
    {
      key: 'cooperations',
      label: t('pages.partners.tabs.cooperations.title'),
      component: <CooperationsPartners />,
    },
  ]

  const [activeSectionKey, setActiveSectionKey] = useState<string>(
    sections[0].key
  )

  const ActiveSection = useMemo(() => {
    const componentToRender = sections.find(
      ({ key }) => key === activeSectionKey
    )

    return componentToRender?.component ?? FinancialPartners
  }, [activeSectionKey])

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
          <Tabs items={sections} onChange={setActiveSectionKey} />
        </SectionContent>
      </Section>
      {ActiveSection}
    </Layout>
  )
}

export default PartnersPage
