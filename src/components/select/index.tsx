import * as React from 'react'
import * as S from './styles'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select: React.FC<SelectProps> = (props) => <S.Select />

export default Select