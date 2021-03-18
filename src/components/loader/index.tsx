import styled, { css, keyframes, CssWithTheme } from 'styled-components'

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

interface Props {
  size?: number
  variant?: 'light' | 'dark'
}

const getBorderSize = ({ size }: Props) => {
  if (!size) {
    return 0
  }
  return size / 5
}

function getWidthHeight({ size }: Props): CssWithTheme {
  return css`
    width: ${size}px;
    height: ${size}px;
  `
}

export const Loader = styled.div<Props>`
  border-radius: 50%;
  ${getWidthHeight}
  &:after {
    ${getWidthHeight}
    border-radius: 50%;
  }
  position: relative;
  border: ${getBorderSize}px solid rgba(255, 255, 255, 0.2);
  border-left: ${getBorderSize}px solid #ffffff;
  transform: translateZ(0);
  animation: ${spin} 1.1s infinite linear;
`

Loader.defaultProps = {
  size: 16,
}
