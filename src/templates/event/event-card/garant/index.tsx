import * as S from './styles'
import React from 'react'
import slack from '../../../../components/icons/slack'

interface GarantProps {
  avatarUrl: string
  name: string
  email: string
  slack?: string
}

const Garant: React.FC<GarantProps> = (props) => {
  return (
    <S.OuterWrapper>
      <S.Title>Garant události</S.Title>
      <S.Wrapper>
        <S.Avatar src={props.avatarUrl} />
        <S.AvatarTitleWrapper>
          <S.AvatarTitle>{props.name}</S.AvatarTitle>
          <div>
            <S.ContactLink href={`mailto:${props.email}`}>Email</S.ContactLink>
            {slack && <span>, </span>}
            {slack && (
              <S.ContactLink
                href={`https://cesko-digital.slack.com/team/${props.slack}`}
              >
                Slack
              </S.ContactLink>
            )}
          </div>
        </S.AvatarTitleWrapper>
      </S.Wrapper>
    </S.OuterWrapper>
  )
}

export default Garant
