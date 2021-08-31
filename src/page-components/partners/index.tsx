import React, { useMemo, useState } from 'react'
import { Layout, Section, SectionContent } from 'components/layout'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import * as S from './styles'
import FinancialPartners from './sections/financial'
import ExpertsPartners from './sections/experts'
import Tabs from 'components/tabs'
import { HomepageQuery } from 'generated/graphql-types'
import { BlogCardProps } from 'components/cards/blog-card'
import BecomePartner from './sections/become-partner'

export const NAVIGATION_KEY = 'pages.partners.navigation.partners'

interface PartnersPageProps {
  data: HomepageQuery
}

// temporary variable, this should come dynamically from gatsby data instead
const blogCards: BlogCardProps[] = [
  {
    title:
      'Máme prvního technologického partnera! Od Livesportu jsme na provoz získali 3 miliony',
    description:
      'Neziskovkám a veřejné správě pomáháme s digitálními projekty od května předloňského roku, teď jsme úspěšně podepsali smlouvu s prvním technologickým partnerem.',
    link: 'https://blog.cesko.digital/2021/02/livesport',
    cover: 'https://data.cesko.digital/img/78b9a354.png',
  },
  {
    title:
      'Partnerství s Bakala Foundation pomůže rozvíjet Česko.Digital, digitalizovat školství a pečovat o duševní zdraví',
    description:
      'S radostí oznamujeme, že Česko.Digital uzavřelo partnerství s rodinnou nadací Bakala Foundation. Čtyři miliony z nadace podpoří jednak rozvoj celého Česko.Digital, jednak projekty, v nichž se naše aktivity a cíle prolínají',
    link: 'https://blog.cesko.digital/2021/04/partnerstvi-bakala',
    cover: 'https://data.cesko.digital/img/a19cd27d.jpg',
  },
  {
    title:
      'Česko.Digital rozšiřuje své služby i celospolečenský dopad. Spolu s Nadací OSF spouští inkubátor',
    description:
      'Komunita expertních dobrovolníků Česko.Digital spouští ve spolupráci s Nadací OSF vlastní inkubátor veřejně prospěšných neziskových projektů, do kterého se mohou přihlásit jednotlivci i organizace.',
    link: 'https://blog.cesko.digital/2021/01/tz-inkubator',
    cover: 'https://data.cesko.digital/img/7f3270ab.png',
  },
]

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
          blogCards={blogCards}
        />
      ),
    },
    {
      key: 'experts',
      label: t('pages.partners.tabs.experts.title'),
      component: <ExpertsPartners />,
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
      <BecomePartner />
    </Layout>
  )
}

export default PartnersPage
