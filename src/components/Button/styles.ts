import styled, { css } from 'styled-components'
import { ButtonSize, ButtonType } from '.'

interface Props {
  buttonType: ButtonType
  size: ButtonSize
}

const applyStylesByType = (buttonType: ButtonType) => {
  console.log(buttonType)
  switch (buttonType) {
    case ButtonType.Primary:
      return css`
        background-color: blue;
        color: white;
      `
    case ButtonType.Secondary:
      return css`
        background-color: white;
        color: blue;
      `
    default:
      throw new Error(`Unknown button type: ${buttonType}`)
  }
}

const applyStylesBySize = (size: ButtonSize) => {
  switch (size) {
    case ButtonSize.Normal:
      return css`
      font-size: 18px;
      height: 52px;
      padding: 0 14px;
      `
    case ButtonSize.Small:
      return css`
      font-size: 15px;
      height: 30px;
      `
    default:
      throw new Error(`Unknown button size: ${size}`)
  }
}

export const Button = styled.button<Props>`
  ${(p) => applyStylesByType(p.buttonType)};
  ${(p) => applyStylesBySize(p.size)};

  border-radius: 8px;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 1px 2px rgba(8, 8, 49, 0.12);

  font-weight: 600;
  line-height: 1.3;
  padding: 0 14px;

  display: flex;
  align-items: center;

  border: none;
  outline: none;
`
