import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { Section, SectionContent } from 'components/layout'
import * as S from './styles'
import BecomePartnerForm from './form'

const BecomePartner: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Section>
      <SectionContent verticalPadding={60}>
        <S.Wrapper>
          <S.CenteredTextWrapper>
            <S.Subtitle>
              {t('pages.partners.becomePartner.aboveTitle')}
            </S.Subtitle>
            <S.Title>{t('pages.partners.becomePartner.title')}</S.Title>
            {/* <S.Subtitle>
              <a href="mailto:partneri@cesko.digital">partneri@cesko.digital</a>
            </S.Subtitle> */}
          </S.CenteredTextWrapper>
          <div>
            <BecomePartnerForm />
          </div>
        </S.Wrapper>
      </SectionContent>
    </Section>
  )
}

export default BecomePartner
