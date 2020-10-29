import styled, {
  css,
  DefaultTheme,
  FlattenInterpolation,
  ThemeProps,
} from 'styled-components'
import { StyledLinkProps } from '.'
import { ButtonSize } from '../button'

export const Link = styled.a<StyledLinkProps>`
  ${(p) => applyLinkStyles({ size: p.size, disabled: p.disabled })}
`

export const applyLinkStyles = ({
  size,
  disabled,
}: StyledLinkProps): FlattenInterpolation<ThemeProps<DefaultTheme>> => {
  return css`
    display: inline-flex;
    text-decoration: none;
    background: none;

    font-family: ${(p) => p.theme.fonts.body};

    font-weight: ${(p) =>
      size === ButtonSize.Small ? 500 : p.theme.fontWeights.button};

    font-size: ${(p) =>
      size === ButtonSize.Normal
        ? p.theme.fontSizes.base
        : p.theme.fontSizes.small}px;

    line-height: ${(p) => p.theme.lineHeights.button};

    align-items: center;

    border: none;
    outline: none;

    padding: 0;

    position: relative;

    border-radius: ${(p) => p.theme.borderRadius.none};

    cursor: ${() => (disabled ? 'not-allowed' : 'pointer')};

    color: ${(p) =>
      disabled
        ? p.theme.colors.gravel
        : size === ButtonSize.Normal
        ? p.theme.colors.it
        : p.theme.colors.darkGrey};
    border-bottom: ${() => (size === ButtonSize.Normal ? '2px solid' : 'none')};
    border-color: ${(p) =>
      disabled ? p.theme.colors.pebble : p.theme.colors.lightViolet};
    text-decoration: ${() =>
      size === ButtonSize.Small ? 'underline' : 'none'};

    ${() =>
      disabled
        ? null
        : css`
            &:hover,
            &:focus {
              border-color: ${(p) => p.theme.colors.purple};
              text-decoration: none;
              font-weight: ${(p) =>
                size === ButtonSize.Small ? 300 : p.theme.fontWeights.button};
            }
          `}
  `
}
