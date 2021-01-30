import { NewProject, PanelVolunteer } from 'components/cards'
import React from 'react'

import * as S from './styles'

export interface JoinUsProps {
  volunteer: {
    title: string
    description: string
    cover: string
    slackLink: string
  }
  project: {
    name: string
    description: string
    cover: string
    linkUrl: string
    linkText: string
  }
}

const JoinUs: React.FC<JoinUsProps> = ({ volunteer, project }: JoinUsProps) => {
  return (
    <S.Container>
      <S.Title>Zapojte se</S.Title>
      <S.CircleCover />
      <S.Card>
        <PanelVolunteer {...volunteer} />
        <NewProject {...project} />
      </S.Card>
    </S.Container>
  )
}

export default JoinUs
