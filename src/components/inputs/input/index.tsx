import * as React from 'react'
import * as S from './styles'

export interface StyledInputProps {
  dark?: boolean
  invalid?: boolean
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    Partial<StyledInputProps> {}

const Input: React.FC<InputProps> = ({
  dark,
  invalid,
  ...rest
}: InputProps) => <S.Input dark={dark} invalid={invalid} {...rest} />

export default Input
