import * as React from 'react'
import styled from 'styled-components'
import { StyledButtonProps } from '../../buttons/button'
import { applyButtonStyles } from '../../buttons/button/styles'
import { ButtonSize } from '../../buttons'
import { default as GatsbyLink, GatsbyLinkProps } from 'gatsby-link'

/**
 * The component is used where we need to have
 * a Button which behaves AS a Link
 */

const StyledLink = styled(GatsbyLink)<StyledButtonProps>`
  ${(p) =>
    applyButtonStyles({
      size: p.size,
      disabled: p.disabled,
      inverted: p.inverted,
    })}
`

export interface ButtonAsLinkProps
  extends Omit<GatsbyLinkProps<Record<string, unknown>>, 'ref'>,
    Partial<StyledButtonProps> {
  children: React.ReactChild
}

const ButtonAsLink: React.FC<ButtonAsLinkProps> = ({
  children,
  size = ButtonSize.Normal,
  to: url,
  inverted,
  ...rest
}: ButtonAsLinkProps) => {
  const href = rest.disabled ? '' : url
  return (
    <StyledLink inverted={inverted} size={size} {...rest} to={href}>
      {children}
    </StyledLink>
  )
}

export default ButtonAsLink
