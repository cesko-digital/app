import * as React from 'react'
import styled from 'styled-components'
import { ButtonSize, StyledButtonProps } from '../Button'
import { applyButtonStyles } from '../Button/styles'

const StyledButton = styled.a<StyledButtonProps>`
    ${p => applyButtonStyles({ size: p.size, disabled: p.disabled, inverted: p.inverted })}
`

export interface ButtonAsLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    Partial<StyledButtonProps> {
  children: React.ReactChild
}

const ButtonAsLink: React.FC<ButtonAsLinkProps> = ({
  children,
  size = ButtonSize.Normal,
  inverted,
  ...rest
}: ButtonAsLinkProps) => (
  <StyledButton inverted={inverted} size={size} {...rest}>
    {children}
  </StyledButton>
)

export default ButtonAsLink