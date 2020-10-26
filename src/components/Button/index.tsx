import * as React from 'react'
import * as S from './styles'

export enum ButtonType {
  Primary,
  Secondary
}

export enum ButtonSize {
  Normal,
  Small
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactChild
  buttonType?: ButtonType
  size?: ButtonSize
}

export const Button: React.FC<ButtonProps> = ({
  children,
  size = ButtonSize.Normal,
  buttonType = ButtonType.Primary,
  ...rest
}: ButtonProps) => (
  <S.Button buttonType={buttonType} size={size} {...rest}>{children}</S.Button>
)