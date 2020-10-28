import styled, { css } from 'styled-components'
import { ButtonSize, StyledButtonProps } from '.'

export const applyButtonStyles = ({
  size,
  disabled,
  inverted,
}: StyledButtonProps) => {
  return css`
    display: inline-flex;

    height: ${() => (size === ButtonSize.Normal ? 52 : 30)}px;

    padding: 0 ${() => (size === ButtonSize.Normal ? 30 : 14)}px;

    font-weight: 600;
    line-height: 1.3;

    align-items: center;

    border: none;
    outline: none;

    position: relative;

    border-radius: 0;

    text-decoration: none;

    background-color: ${() => (inverted ? 'white' : 'blue')};
    color: ${() => (inverted ? 'blue' : 'white')};

    cursor: ${() => (disabled ? 'not-allowed' : 'pointer')};

    font-size: ${() => (size === ButtonSize.Normal ? 18 : 15)}px;

    border-radius: 8px;
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.08),
      0px 1px 2px rgba(8, 8, 49, 0.12);

    ${() => {
      return disabled
        ? css`
            background: ${() => (inverted ? 'white' : '#a9a9b1')};
            color: ${() => (inverted ? '#a9a9b1' : 'white')};
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
                top: -2px;
                left: -2px;
                right: -2px;
                bottom: -2px;
                z-index: -1;
                border-radius: 10px;
                border: 2px solid #ccccff;
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
