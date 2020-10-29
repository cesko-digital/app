import * as React from 'react'
import { ButtonSize } from '../Button'
import styled from 'styled-components'
import { applyLinkStyles } from '../Link/styles'
import { StyledLinkProps } from '../Link'

const StyledLink = styled.button<StyledLinkProps>`
  ${(p) => applyLinkStyles({ size: p.size, disabled: p.disabled })}
`

export interface LinkAsButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Partial<StyledLinkProps> {
  children: React.ReactChild
}

const LinkAsButton: React.FC<LinkAsButtonProps> = ({
  children,
  size = ButtonSize.Normal,
  ...rest
}: LinkAsButtonProps) => (
  <StyledLink size={size} {...rest}>
    {children}
  </StyledLink>
)

export default LinkAsButton
