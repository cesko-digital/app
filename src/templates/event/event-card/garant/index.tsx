import * as S from './styles'
import React from 'react'

interface GarantProps {
  avatarUrl: string
  name: string
}

const Garant: React.FC<GarantProps> = (props) => {
  return (
    <S.OuterWrapper>
      <S.Title>Grant události</S.Title>
      <S.Wrapper>
        <S.Avatar src={props.avatarUrl} />
        <S.AvatarTitle>{props.name}</S.AvatarTitle>
      </S.Wrapper>
    </S.OuterWrapper>
  )
}

export default Garant
