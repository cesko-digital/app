import * as S from './styles'
import React from 'react'

interface ProjectProps {
  avatarUrl: string
  name: string
}

const Project: React.FC<ProjectProps> = (props) => {
  return (
    <S.Project>
      <S.Title>Projekt</S.Title>
      <S.Wrapper>
        <S.Avatar src={props.avatarUrl} />
        <S.AvatarTitle>{props.name}</S.AvatarTitle>
      </S.Wrapper>
    </S.Project>
  )
}

export default Project
