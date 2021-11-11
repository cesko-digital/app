import * as S from './styles'
import React from 'react'
import { getResizedImgUrl } from '../../../../utils/get-resized-img-url'

interface ProjectProps {
  avatarUrl: string
  name: string
  projectUrl: string
  silent: boolean
}

const Project: React.FC<ProjectProps> = (props) => {
  let wrapper
  if (props.silent) {
    wrapper = (
      <S.Wrapper>
        <S.Avatar src={getResizedImgUrl(props.avatarUrl, 60)} />
        <S.AvatarTitle>{props.name}</S.AvatarTitle>
      </S.Wrapper>
    )
  } else {
    wrapper = (
      <S.LinkWrapper href={props.projectUrl}>
        <S.Avatar src={getResizedImgUrl(props.avatarUrl, 60)} />
        <S.AvatarTitle>{props.name}</S.AvatarTitle>
      </S.LinkWrapper>
    )
  }
  return (
    <S.Project>
      <S.Title>Projekt</S.Title>
      {wrapper}
    </S.Project>
  )
}

export default Project
