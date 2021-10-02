import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { CardRow, Section, SectionContent } from 'components/layout'
import { Heading2, Heading3 } from 'components/typography'
import LogoList from 'components/logo-list'
import {
  mapPartnerLogoInfoToLogo,
  PartnerLogoInfo,
} from 'components/logo-list/utils'
import * as S from '../../styles'
import { Button } from 'components/buttons/button/styles'
import { ButtonSize } from 'components/buttons'
import BlogCard, { BlogCardProps } from 'components/cards/blog-card'
import { BlogHeader } from './styles'

interface FinancialPartnersProps {
  mainPartnersLogos: PartnerLogoInfo[]
  regularPartnersLogos: PartnerLogoInfo[]
  grantsLogos: PartnerLogoInfo[]
  blogCards: BlogCardProps[]
}

const FinancialPartners: React.FC<FinancialPartnersProps> = ({
  mainPartnersLogos,
  regularPartnersLogos,
  grantsLogos,
  blogCards = [],
}) => {
  const { t } = useTranslation()
  return (
    <Section>
      <SectionContent verticalPadding={60}>
        <Heading2>{t('pages.partners.financial.heading.title')}</Heading2>
        <S.PaddedBody>
          {t('pages.partners.financial.heading.perex')}
        </S.PaddedBody>
      </SectionContent>
      <SectionContent verticalPadding={0}>
        <Heading3>{t('pages.partners.financial.mainPartners.title')}</Heading3>
        <S.PaddedBody>
          {t('pages.partners.financial.mainPartners.perex')}
        </S.PaddedBody>
        <S.PaddedBody>
          <LogoList items={mainPartnersLogos.map(mapPartnerLogoInfoToLogo)} />
        </S.PaddedBody>
      </SectionContent>
      {blogCards.length > 0 && (
        <SectionContent>
          <BlogHeader>
            <Heading3>{t('pages.partners.blog.title')}</Heading3>
            {/* <Link to={LINKS.blog}>{t('pages.partners.blog.linkAll')}</Link> */}
          </BlogHeader>
          <CardRow>
            {blogCards.map((card) => (
              <BlogCard key={card.link} {...card} />
            ))}
          </CardRow>
        </SectionContent>
      )}
      <SectionContent verticalPadding={60}>
        <Heading3>
          {t('pages.partners.financial.regularPartners.title')}
        </Heading3>
        <S.PaddedBody>
          {t('pages.partners.financial.regularPartners.perex')}
        </S.PaddedBody>
        <S.PaddedBody>
          <LogoList
            items={regularPartnersLogos.map(mapPartnerLogoInfoToLogo)}
          />
        </S.PaddedBody>
      </SectionContent>
      <SectionContent>
        <Heading3>{t('pages.partners.financial.donators.title')}</Heading3>
        <S.PaddedBody>
          {t('pages.partners.financial.donators.perex')}
        </S.PaddedBody>
        <S.PaddedBody>
          <Button size={ButtonSize.Normal}>
            {t('pages.partners.financial.donators.button')}
          </Button>
        </S.PaddedBody>
      </SectionContent>
      <SectionContent>
        <Heading3>{t('pages.partners.financial.grants.title')}</Heading3>
        <S.PaddedBody>
          {t('pages.partners.financial.grants.perex')}
        </S.PaddedBody>
        <S.PaddedBody>
          <LogoList items={grantsLogos.map(mapPartnerLogoInfoToLogo)} />
        </S.PaddedBody>
      </SectionContent>
    </Section>
  )
}

export default FinancialPartners
