import styled from 'styled-components'
import {
  applyButtonStyles,
  StyledButtonProps,
} from 'components/buttons/button/styles'
import { default as GatsbyLink } from 'gatsby-link'

export const InternalLink = styled(GatsbyLink)<StyledButtonProps>`
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
