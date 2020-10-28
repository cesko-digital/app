import React from 'react'
import * as S from './styles'
import ButtonAsLink from '../links/button-as-link'

export interface NewProjectProps {
  name: string
  description: string
  icon: string
  linkUrl: string
  linkText: string
}

export const NewProject: React.FC<NewProjectProps> = ({
  name,
  description,
  icon,
  linkUrl,
  linkText,
}: NewProjectProps) => (
  <S.Wrapper>
    <S.Image src={icon} />
    <S.Title>{name}</S.Title>
    <S.Description>{description}</S.Description>
    <S.ButtonWrapper>
      <ButtonAsLink to={linkUrl}>{linkText}</ButtonAsLink>
    </S.ButtonWrapper>
  </S.Wrapper>
)
