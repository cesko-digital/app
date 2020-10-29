import styled, {
  css,
  DefaultTheme,
  FlattenInterpolation,
  ThemeProps,
} from 'styled-components'
import { ButtonSize, StyledButtonProps } from '.'

export const applyButtonStyles = ({
  size,
  disabled,
  inverted,
}: StyledButtonProps): FlattenInterpolation<ThemeProps<DefaultTheme>> => {
  return css`
    display: inline-flex;

    font-family: ${(p) => p.theme.fonts.body};

    height: ${() => (size === ButtonSize.Normal ? 52 : 30)}px;

    padding: 0 ${() => (size === ButtonSize.Normal ? 30 : 14)}px;

    font-weight: ${(p) => p.theme.fontWeights.button};
    line-height: ${(p) => p.theme.lineHeights.button};

    align-items: center;

    border: none;
    outline: none;

    position: relative;

    text-decoration: none;

    background-color: ${(p) =>
      inverted ? p.theme.colors.white : p.theme.colors.it};
    color: ${(p) => (inverted ? p.theme.colors.it : p.theme.colors.white)};

    cursor: ${() => (disabled ? 'not-allowed' : 'pointer')};

    font-size: ${(p) =>
      size === ButtonSize.Normal
        ? p.theme.fontSizes.base
        : p.theme.fontSizes.small}px;

    border-radius: ${(p) => p.theme.borderRadius.base}px;
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.08),
      0px 1px 2px rgba(8, 8, 49, 0.12);

    ${() => {
      const outlineThickness = 2
      return disabled
        ? css`
            background: ${(p) =>
              inverted ? p.theme.colors.white : p.theme.colors.gravel};
            color: ${(p) =>
              inverted ? p.theme.colors.gravel : p.theme.colors.white};
            box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.08),
              0px 1px 2px rgba(8, 8, 49, 0.12);
            &:before {
              content: none;
            }
          `
        : css`
            &:hover {
              background-color: ${() => (inverted ? 'initial' : '#3333ff')};
            }
            &:focus {
              &:before {
                content: '';
                position: absolute;
                top: -${outlineThickness}px;
                left: -${outlineThickness}px;
                right: -${outlineThickness}px;
                bottom: -${outlineThickness}px;
                z-index: -1;
                border-radius: ${(p) =>
                  p.theme.borderRadius.base + outlineThickness}px;
                border: ${outlineThickness}px solid #ccccff;
              }
            }

            &:hover,
            &:focus {
              box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.18),
                0px 1px 2px rgba(8, 8, 49, 0.12);
            }
          `
    }}
  `
}

export const Button = styled.button<StyledButtonProps>`
  ${(p) =>
    applyButtonStyles({
      size: p.size,
      disabled: p.disabled,
      inverted: p.inverted,
    })}
`
