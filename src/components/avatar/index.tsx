import React from 'react'
import * as S from './styles'

export interface Props {
  title: string
  subtitle: string
  pictureUrl?: string
}

export const Avatar: React.FC<Props> = ({ title, subtitle, pictureUrl }) => {
  return (
    <S.Wrapper>
      {pictureUrl ? (
        <S.Picture src={pictureUrl} alt={title} title={title} />
      ) : (
        <S.PicturePlaceholder />
      )}
      <S.Title>{title}</S.Title>
      <S.SubTitle>{subtitle}</S.SubTitle>
    </S.Wrapper>
  )
}
