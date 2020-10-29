import * as React from 'react'
import * as S from './styles'

export enum ButtonSize {
  Normal = 'Normal',
  Small = 'Small',
}

export interface StyledButtonProps {
  inverted?: boolean
  size: ButtonSize
  disabled?: boolean
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Partial<StyledButtonProps> {
  children: React.ReactChild
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = ButtonSize.Normal,
  inverted,
  ...rest
}: ButtonProps) => (
  <S.Button inverted={inverted} size={size} {...rest}>
    {children}
  </S.Button>
)

export default Button
