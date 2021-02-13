import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import * as S from './styles'

const HOMEPAGE_TRANSLATION_KEY = `pages.homepage`
const HOMEPAGE_SECTIONS_TRANSLATION_KEY = `${HOMEPAGE_TRANSLATION_KEY}.sections`
const NUMBERS_TRANSLATION_KEY = `${HOMEPAGE_SECTIONS_TRANSLATION_KEY}.numbers`

const Numbers: React.FC = () => {
  const { t } = useTranslation()
  const NUMBERS_KEYS = ['first', 'second', 'third', 'fourth']

  return (
    <S.Wrapper>
      {NUMBERS_KEYS.map((translationOrderKey) => (
        <S.Item key={translationOrderKey}>
          <S.Value>
            {t(`${NUMBERS_TRANSLATION_KEY}.${translationOrderKey}.value`)}
          </S.Value>
          <S.Subtitle>
            {t(`${NUMBERS_TRANSLATION_KEY}.${translationOrderKey}.subtitle`)}
          </S.Subtitle>
        </S.Item>
      ))}
    </S.Wrapper>
  )
}

export default Numbers
