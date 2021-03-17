import React from 'react'
import Volunteers, { Volunteer } from './volunteers'
import { Body, Heading2 } from 'components/typography'
import * as S from './styles'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { getBodyText } from './helpers'

interface Props {
  description: string
  finishedProjectSubtitle: string
  progress: number
  volunteers: Volunteer[]
}

const AboutProject: React.FC<Props> = ({
  volunteers,
  description,
  finishedProjectSubtitle,
  progress,
}) => {
  const { t } = useTranslation()
  return (
    <S.Wrapper>
      <Heading2>{t('pages.project.about.title')}</Heading2>
      <S.Description>{description}</S.Description>
      <Heading2>
        {volunteers.length}&nbsp;{t('pages.project.about.volunteers.title')}
      </Heading2>
      <Body>
        {getBodyText({
          progress,
          finishedProjectSubtitle,
          ongoingProjectSubtitle: t('pages.project.about.volunteers.subtitle'),
        })}
      </Body>
      <Volunteers volunteers={volunteers} />
    </S.Wrapper>
  )
}

export default AboutProject
