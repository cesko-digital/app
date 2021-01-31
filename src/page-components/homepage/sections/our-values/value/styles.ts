import styled from 'styled-components'

export const ValueWrapper = styled.div`
  width: 326px;
  margin-right: 60px;
  margin-bottom: ${({ theme }) => theme.space.xl}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    margin-bottom: 55px;
  }
`

export const ValueTitle = styled.h3`
  margin: 25px 0 0;

  font-weight: ${({ theme }) => theme.fontWeights.heading};
  font-size: ${({ theme }) => theme.fontSizes.md}px;
  line-height: ${({ theme }) => theme.lineHeights.body};
  color: ${({ theme }) => theme.colors.darkGrey};
`
export const ValuePerex = styled.p`
  margin: 0;

  font-size: 20px;
  line-height: ${({ theme }) => theme.lineHeights.body};
  color: ${({ theme }) => theme.colors.darkGrey};
  opacity: 0.8;
`

const ICON_SIZE = 72

export const ValueIconContainer = styled.div`
  width: ${ICON_SIZE}px;
  height: ${ICON_SIZE}px;

  svg {
    width: 100%;
    height: 100%;
  }
`
