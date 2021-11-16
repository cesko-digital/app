import React, { useContext } from 'react'
import { Heading1 } from 'components/typography'
import * as S from './styles'
import { I18nextContext, useTranslation } from 'gatsby-plugin-react-i18next'
import { LINKS } from 'utils/constants'

const HOMEPAGE_TRANSLATION_KEY = `pages.homepage`
const HEADER_TRANSLATION_KEY = `header`

enum TranslationKeyPrefix {
  Title = 'title',
  Subtitle = 'subtitle',
  SignUp = 'signUp',
  WhatWeDo = 'whatWeDo',
}

const Hero: React.FC = () => {
  const { t } = useTranslation()
  const { language } = useContext(I18nextContext)

  const isCzech = language === 'cs'

  return (
    <S.Section>
      <S.Container>
        <S.Card>
          <S.Content>
            <Heading1>
              {t(`${HOMEPAGE_TRANSLATION_KEY}.${TranslationKeyPrefix.Title}`)}
            </Heading1>

            <S.ShiftedBody>
              {t(
                `${HOMEPAGE_TRANSLATION_KEY}.${TranslationKeyPrefix.Subtitle}`
              )}
            </S.ShiftedBody>

            {isCzech && (
              <S.ButtonAsLinkElement to="/projekty">
                {t(
                  `${HOMEPAGE_TRANSLATION_KEY}.${TranslationKeyPrefix.WhatWeDo}`
                )}
              </S.ButtonAsLinkElement>
            )}

            {isCzech && (
              <S.ShiftedButton inverted to={LINKS.joinUs}>
                {t(`${HEADER_TRANSLATION_KEY}.${TranslationKeyPrefix.SignUp}`)}
              </S.ShiftedButton>
            )}

            <S.HeroPersonTopCircleImage />
          </S.Content>
        </S.Card>
        <S.Card>
          <S.CzechiaMap />
          <S.HeroTeamCircleImage />
          <S.CircleRight>
            <S.Circle color="#080831" />
          </S.CircleRight>
        </S.Card>
      </S.Container>
      <S.CircleLeft>
        <S.Circle color="#fff6a3" />
      </S.CircleLeft>
      <S.HeroPersonBottomCircleImage />
      <S.CzechiaMapMobile />
    </S.Section>
  )
}

export default Hero
