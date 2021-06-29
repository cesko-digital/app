import React from 'react'
import * as S from './styles'

interface InfoProps {
  title: string
  content: string
}

const Info: React.FC<InfoProps> = (props) => {
  return (
    <S.Wrapper>
      <S.Title>{props.title}</S.Title>
      <S.Content>{props.content}</S.Content>
    </S.Wrapper>
  )
}

export default Info
