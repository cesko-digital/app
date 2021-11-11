import * as S from './styles'
import React from 'react'

interface GarantProps {
  avatarUrl: string
  name: string
  email: string
}

const Garant: React.FC<GarantProps> = (props) => {
  return (
    <S.OuterWrapper>
      <S.Title>Kontakt</S.Title>
      <S.Wrapper>
        <S.Avatar src={props.avatarUrl} />
        <S.AvatarTitleWrapper>
          <S.AvatarTitle>
            <S.ContactLink href={`mailto:${props.email}`}>
              {props.name}
            </S.ContactLink>
          </S.AvatarTitle>
        </S.AvatarTitleWrapper>
      </S.Wrapper>
    </S.OuterWrapper>
  )
}

export default Garant
