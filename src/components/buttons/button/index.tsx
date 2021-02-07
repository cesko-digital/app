import * as React from 'react'
import * as S from './styles'
import { ButtonSize } from './enums'

export interface ClickerProps {
  inverted?: boolean
  size: ButtonSize
  disabled?: boolean
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Partial<ClickerProps> {
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = ButtonSize.Normal,
  inverted,
  ...rest
}: ButtonProps) => (
  <S.Button $inverted={inverted} size={size} {...rest}>
    {children}
  </S.Button>
)

export default Button
