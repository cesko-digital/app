import * as React from 'react'
import * as S from './styles'

export interface Props {
  percent: number
}

const ProgressBar: React.FC<Props> = ({ percent }) => (
  <S.Container>
    <S.Background />
    <S.Progress percent={percent} />
  </S.Container>
)

export default ProgressBar
