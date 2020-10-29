import styled, {
  css,
  DefaultTheme,
  FlattenInterpolation,
  ThemeProps,
} from 'styled-components'
import { StyledLinkProps } from '.'
import { ButtonSize } from '../Button'

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

    font-weight: ${() => (size === ButtonSize.Small ? 500 : 600)};

    font-size: ${() => (size === ButtonSize.Small ? 15 : 18)}px;
    line-height: 1.3;

    align-items: center;

    border: none;
    outline: none;

    padding: 0;

    position: relative;

    border-radius: 0;

    cursor: ${() => (disabled ? 'not-allowed' : 'pointer')};

    color: ${() =>
      disabled ? '#a9a9b1' : size === ButtonSize.Normal ? 'blue' : '#080831'};
    border-bottom: ${() => (size === ButtonSize.Normal ? '2px solid' : 'none')};
    border-color: ${() => (disabled ? '#f9f9f9' : '#e5e5ff')};
    text-decoration: ${() =>
      size === ButtonSize.Small ? 'underline' : 'none'};

    ${() =>
      disabled
        ? null
        : css`
            &:hover,
            &:focus {
              border-color: #9999ff;
              text-decoration: none;
              font-weight: ${() => (size === ButtonSize.Small ? 300 : 600)};
            }
          `}
  `
}
