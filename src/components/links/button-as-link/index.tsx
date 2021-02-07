import * as React from 'react'
import { ClickerProps } from 'components/buttons/button'
import { ButtonSize } from 'components/buttons'
import { GatsbyLinkProps } from 'gatsby-link'
import * as S from './styles'
import { isExternalURL } from 'utils/is-url-external'
import { StyledButtonProps } from 'components/buttons/button/styles'

/**
 * The component is used where we need to have
 * a Button which behaves AS a Link
 */
export interface ButtonAsLinkProps
  extends Omit<GatsbyLinkProps<Record<string, unknown>>, 'ref'>,
    Partial<ClickerProps> {
  children: React.ReactNode
}

const ButtonAsLink: React.FC<ButtonAsLinkProps> = ({
  children,
  size = ButtonSize.Normal,
  to: url,
  inverted,
  ...rest
}: ButtonAsLinkProps) => {
  const href = rest.disabled ? '' : url

  const Component: React.ElementType<StyledButtonProps> = isExternalURL(href)
    ? S.ExternalLink
    : S.InternalLink

  const props = {
    $inverted: inverted,
    size,
    [isExternalURL(href) ? 'href' : 'to']: href,
    ...rest,
  }

  return <Component {...props}>{children}</Component>
}

export default ButtonAsLink
