import styled from 'styled-components'
import { Heading4, Body, bodyStyles } from 'components/typography'

export const ValueWrapper = styled.div`
  width: 326px;
  margin-right: 60px;
  margin-bottom: ${({ theme }) => theme.space.xl}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    margin-bottom: 55px;
  }
`

export const ValueTitle = styled(Heading4)`
  margin: 25px 0 0;
`
export const ValuePerex = styled(Body)`
  margin: 0;
  opacity: 0.8;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    ${bodyStyles}
  }
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
