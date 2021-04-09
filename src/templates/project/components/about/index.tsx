import React from 'react'
import { Body, Heading2 } from 'components/typography'
import * as S from './styles'
import { useTranslation } from 'gatsby-plugin-react-i18next'

interface Props {
  description: string
  thankYouText: string
  finished: boolean
}

const AboutProject: React.FC<Props> = ({
  description,
  thankYouText,
  finished,
}) => {
  const { t } = useTranslation()
  return (
    <S.Wrapper>
      <Heading2>{t('pages.project.about.title')}</Heading2>
      <S.Description>{description}</S.Description>
      {finished && <Body>{thankYouText}</Body>}
    </S.Wrapper>
  )
}

export default AboutProject
