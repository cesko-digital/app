import React from 'react'
import * as S from './styles'
import ProgressBar from './progressbar'
import { QuestionIcon } from 'components/icons'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { getTitle } from './helpers'
import { COMPONENT_TRANSLATION_KEY } from '../index'

interface ProgressProps {
  percent: number
}

const Progress: React.FC<ProgressProps> = ({ percent }) => {
  const { t } = useTranslation()
  const title = getTitle({
    percent,
    translations: {
      finished: t(`${COMPONENT_TRANSLATION_KEY}.states.finished`),
      ongoing: t(`${COMPONENT_TRANSLATION_KEY}.states.ongoing`),
      incubator: t(`${COMPONENT_TRANSLATION_KEY}.states.incubator`),
    },
  })
  return (
    <>
      <S.Wrapper>
        <S.Title>{title}</S.Title>
        <S.Tooltip>
          <QuestionIcon />
          <S.Text>{t(`${COMPONENT_TRANSLATION_KEY}.statesHint`)}</S.Text>
        </S.Tooltip>
      </S.Wrapper>
      <ProgressBar percent={percent} />
    </>
  )
}

export default Progress
