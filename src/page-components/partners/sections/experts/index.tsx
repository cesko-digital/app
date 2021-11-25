import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { Section, SectionContent } from 'components/layout'
import { Heading2, Heading3 } from 'components/typography'
import LogoList from 'components/logo-list'
import {
  mapPartnerLogoInfoToLogo,
  PartnerLogoInfo,
} from 'components/logo-list/utils'
import * as S from '../../styles'
import { graphql } from 'gatsby'

interface ExpertsPartnersProps {
  submitterPartnersLogos: PartnerLogoInfo[]
  expertPartnersLogos: PartnerLogoInfo[]
  supportersLogos: PartnerLogoInfo[]
}

const ExpertsPartners: React.FC<ExpertsPartnersProps> = ({
  submitterPartnersLogos,
  supportersLogos,
}) => {
  const { t } = useTranslation()
  return (
    <Section>
      <SectionContent verticalPadding={60}>
        <Heading2>{t('pages.partners.experts.heading.title')}</Heading2>
        <S.PaddedBody>{t('pages.partners.experts.heading.perex')}</S.PaddedBody>
      </SectionContent>
      <SectionContent verticalPadding={0}>
        <Heading3>{t('pages.partners.experts.submitters.title')}</Heading3>
        <S.PaddedBody>
          {t('pages.partners.experts.submitters.perex')}
        </S.PaddedBody>
        <S.PaddedBody>
          <LogoList
            items={submitterPartnersLogos.map(mapPartnerLogoInfoToLogo)}
          />
        </S.PaddedBody>
      </SectionContent>
      <SectionContent verticalPadding={60}>
        <Heading3>{t('pages.partners.experts.regularPartners.title')}</Heading3>
        <S.PaddedBody>
          {t('pages.partners.experts.regularPartners.perex')}
        </S.PaddedBody>
        <S.PaddedBody>
          <LogoList items={supportersLogos.map(mapPartnerLogoInfoToLogo)} />
        </S.PaddedBody>
      </SectionContent>
    </Section>
  )
}

export default ExpertsPartners

export const query = graphql`
  fragment ExpertPartners on Query {
    submitters: allPartner(filter: { category: { eq: "experts.submitters" } }) {
      nodes {
        name
        url
        logoUrl
      }
    }
    experts: allPartner(filter: { category: { eq: "experts.experts" } }) {
      nodes {
        name
        url
        logoUrl
      }
    }
    supporters: allPartner(filter: { category: { eq: "experts.supporters" } }) {
      nodes {
        name
        url
        logoUrl
      }
    }
  }
`
