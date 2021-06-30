import React from 'react'
import * as S from './styles'

interface InfoProps {
  title: string
  content: string
  url?: string
}

const Info: React.FC<InfoProps> = (props) => {
  let content
  if (!!props.url) {
    content = <S.ContentLink href={props.url}>{props.content}</S.ContentLink>
  } else {
    content = <S.Content>{props.content}</S.Content>
  }
  return (
    <S.Wrapper>
      <S.Title>{props.title}</S.Title>
      {content}
    </S.Wrapper>
  )
}

export default Info
