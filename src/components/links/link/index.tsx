import * as React from 'react'
import * as S from './styles'
import { ButtonSize } from 'components/buttons'
import { GatsbyLinkProps } from 'gatsby-link'
import { isExternalURL } from 'utils/is-url-external'

export interface StyledLinkProps {
  disabled?: boolean
  size: ButtonSize
}

export interface LinkProps
  extends Omit<GatsbyLinkProps<Record<string, unknown>>, 'ref'>,
    Partial<StyledLinkProps> {
  children: React.ReactNode
  locale?: string
}

const Link: React.FC<LinkProps> = ({
  children,
  size = ButtonSize.Normal,
  to: url,
  ...rest
}: LinkProps) => {
  const href = rest.disabled ? '' : url
  const Component = isExternalURL(href) ? S.ExternalLink : S.InternalLink
  const props = {
    size,
    [isExternalURL(href) ? 'href' : 'to']: href,
    ...rest,
  }
  return <Component {...props}>{children}</Component>
}

export default Link
