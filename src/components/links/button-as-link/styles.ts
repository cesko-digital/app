import styled from 'styled-components'
import {
  applyButtonStyles,
  StyledButtonProps,
} from 'components/buttons/button/styles'
import { TranslatedLink } from 'gatsby-plugin-translate-urls'

export const InternalLink = styled(TranslatedLink)<StyledButtonProps>`
  ${(p) =>
    applyButtonStyles({
      size: p.size,
      disabled: p.disabled,
      $inverted: p.$inverted,
    })}
`

export const ExternalLink = styled.a<StyledButtonProps>`
  ${(p) =>
    applyButtonStyles({
      size: p.size,
      disabled: p.disabled,
      $inverted: p.$inverted,
    })}
`
