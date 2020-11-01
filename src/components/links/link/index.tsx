import * as React from 'react'
import * as S from './styles'
import { ButtonSize } from 'components/buttons'
import { GatsbyLinkProps } from 'gatsby-link'

export interface StyledLinkProps {
  disabled?: boolean
  size: ButtonSize
}

export interface LinkProps
  extends Omit<GatsbyLinkProps<Record<string, unknown>>, 'ref'>,
    Partial<StyledLinkProps> {
  children: React.ReactChild
}

const Link: React.FC<LinkProps> = ({
  children,
  size = ButtonSize.Normal,
  to: url,
  ...rest
}: LinkProps) => {
  const href = rest.disabled ? '' : url
  return (
    <S.Link to={href} size={size} {...rest}>
      {children}
    </S.Link>
  )
}

export default Link
