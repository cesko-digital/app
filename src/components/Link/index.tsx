import * as React from 'react'
import { ButtonSize } from '../Button'
import * as S from './styles'

export interface StyledLinkProps {
  disabled?: boolean
  size: ButtonSize
}

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    Partial<StyledLinkProps> {
  children: React.ReactChild
}

const Link: React.FC<LinkProps> = ({
  children,
  size = ButtonSize.Normal,
  href: url,
  ...rest
}: LinkProps) => {
  const href = rest.disabled ? undefined : url
  return (
    <S.Link href={href} size={size} {...rest}>
      {children}
    </S.Link>
  )
}

export default Link
