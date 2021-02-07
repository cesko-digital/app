import React from 'react'
import { NewProject, PanelVolunteer } from 'components/cards'

import * as S from './styles'

const JoinUs: React.FC = () => (
  <S.Container>
    <S.Title>Zapojte se</S.Title>
    <S.CircleCover />
    <S.Card>
      <PanelVolunteer />
      <NewProject />
    </S.Card>
  </S.Container>
)

export default JoinUs
