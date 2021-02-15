import * as React from 'react'
import { StyledButtonProps } from 'components/buttons/button'
import { ButtonSize } from 'components/buttons'
import { GatsbyLinkProps } from 'gatsby-link'
import * as S from './styles'
import { isExternalURL } from 'utils/is-url-external'

/**
 * The component is used where we need to have
 * a Button which behaves AS a Link
 */
export interface ButtonAsLinkProps
  extends Omit<GatsbyLinkProps<Record<string, unknown>>, 'ref'>,
    Partial<StyledButtonProps> {
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

  const props = {
    $inverted: inverted,
    size,
    ...rest,
  }

  if (isExternalURL(href)) {
    return (
      <S.ExternalLink href={href} {...props}>
        {children}
      </S.ExternalLink>
    )
  }
  return (
    <S.InternalLink to={href} {...props}>
      {children}
    </S.InternalLink>
  )
}

export default ButtonAsLink
