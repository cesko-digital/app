import React from 'react'
import * as S from './styles'
import ButtonAsLink from '../../links/button-as-link'
import { BulbIcon } from 'components/icons'

export interface NewProjectProps {
  name: string
  description: string
  linkUrl: string
  linkText: string
}

const NewProject: React.FC<NewProjectProps> = ({
  name,
  description,
  linkUrl,
  linkText,
}: NewProjectProps) => (
  <S.Wrapper>
    <BulbIcon />
    <S.Title>{name}</S.Title>
    <S.Description>{description}</S.Description>
    <S.ButtonWrapper>
      <ButtonAsLink to={linkUrl}>{linkText}</ButtonAsLink>
    </S.ButtonWrapper>
  </S.Wrapper>
)

export default NewProject
