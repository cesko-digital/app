import React from 'react'
import * as S from './styles'

interface Img {
  url: string
  alt: string
  ratio: number
}

const Img: React.FC = (set) => (
  <S.Img src={set.url} alt={set.alt} ratio={set.ratio} loading="lazy" />
)

export default Img