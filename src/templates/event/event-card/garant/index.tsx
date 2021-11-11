import * as S from './styles'
import React from 'react'
import { getResizedImgUrl } from '../../../../utils/get-resized-img-url'

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
        <S.Avatar src={getResizedImgUrl(props.avatarUrl, 60)} />
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
