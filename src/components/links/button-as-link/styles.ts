import styled from 'styled-components'
import {
  applyButtonStyles,
  StyledButtonProps,
} from 'components/buttons/button/styles'
import { Link as TranslatedLink } from 'gatsby-plugin-react-i18next'

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
