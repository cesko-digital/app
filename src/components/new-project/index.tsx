import React from 'react'
import * as S from './styles'

// TODO: link to slack
export interface NewProjectProps {
  name: string
  description: string
  icon: string
}

export const NewProject: React.FC<NewProjectProps> = ({
  name,
  description,
  icon,
}: NewProjectProps) => (
  <S.Wrapper>
    <span>{icon}</span>
    <S.Title color="#080831">{name}</S.Title>
    <S.Description color="#080831">{description}</S.Description>
    <button>Zadat project</button>
  </S.Wrapper>
)
