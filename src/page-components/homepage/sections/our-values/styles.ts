import styled from 'styled-components'
import { Heading2, BodyBig, bodyBigStyles } from 'components/typography'

export const Container = styled.div`
  padding: 130px 0;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 43px 0;
  }
`

export const MainTitle = styled(Heading2)`
  margin: 0 0 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 6px;
  }
`
export const MainPerex = styled(BodyBig)`
  margin-bottom: 104px;

  color: ${({ theme }) => theme.colors.asphalt};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: ${({ theme }) => theme.space.lg}px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 72%;
    ${bodyBigStyles}
  }
`

export const WadgeContainer = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
  position: absolute;
  top: 100px;
  right: 0;
`
export const WadgeIconContainerTop = styled.div``
export const WadgeIconContainerBottom = styled.div`
  margin-left: 85px;
`

export const ValuesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  // consider the last row margin of flex items
  margin-bottom: -${({ theme }) => theme.space.xl}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    // consider the last row margin of flex items
    margin-bottom: -55px;
  }
`
