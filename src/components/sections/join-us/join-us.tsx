import { NewProject, PanelVolunteer } from 'components/cards'
import React from 'react'

import * as S from './styles'

const JoinUs: React.FC = () => {
  return (
    <S.Container>
      <S.Title>Zapojte se</S.Title>
      <S.CircleCover />
      <S.Card>
        <PanelVolunteer />
        <NewProject />
      </S.Card>
    </S.Container>
  )
}

export default JoinUs
