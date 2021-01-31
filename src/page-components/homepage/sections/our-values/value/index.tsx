import React from 'react'
import * as S from './styles'

interface Props {
  id: string
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
  title: string
  perex: string
}

const Value: React.FC<Props> = ({ Icon, title, perex }) => (
  <S.ValueWrapper>
    <S.ValueIconContainer>
      <Icon />
    </S.ValueIconContainer>
    <S.ValueTitle>{title}</S.ValueTitle>
    <S.ValuePerex>{perex}</S.ValuePerex>
  </S.ValueWrapper>
)

export default Value
