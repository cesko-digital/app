import React from 'react'
import ButtonAsLink from 'components/links/button-as-link'
import { Heading1 } from 'components/typography'
import * as S from './styles'
import { useTranslation } from 'gatsby-plugin-react-i18next'

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

            <ButtonAsLink to="#">
              {t(
                `${HOMEPAGE_TRANSLATION_KEY}.${TranslationKeyPrefix.WhatWeDo}`
              )}
            </ButtonAsLink>

            <S.ShiftedButton inverted to="#">
              {t(`${HEADER_TRANSLATION_KEY}.${TranslationKeyPrefix.SignUp}`)}
            </S.ShiftedButton>

            <S.image1 />
          </S.Content>
        </S.Card>

        <S.Card>
          <S.CzechiaMap />
          <S.image4 />
          <S.image5 />
        </S.Card>
      </S.Container>

      <S.Circle />
      <S.Image3 />
      <S.CzechiaMapMobile />
    </S.Section>
  )
}

export default Hero
