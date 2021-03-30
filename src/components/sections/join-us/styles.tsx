import styled from 'styled-components'
import { Circle } from 'components/illustrations'

export const Container = styled.div`
  margin: 96px auto;
  position: relative;
  z-index: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: 32px auto;
  }
`

export const CircleCover = styled(Circle)`
  z-index: -1;
  position: absolute;
  left: 30%;
  top: -50px;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    left: 40%;
  }
`

export const Card = styled.section`
  border-radius: ${({ theme }) => theme.borderRadius.base}px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: hidden;
  flex: 1;
  padding: 50px 0 ${({ theme }) => theme.space.small}px;
  max-width: ${({ theme }) => theme.contentSize}px;
  box-sizing: content-box;
  z-index: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 17px 0 0;
  }
`

export const Cover = styled.div<{ url: string }>`
  width: 100%;
  background-image: url(${({ url }) => url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`

export const Content = styled.div`
  height: 287px;
  padding: ${({ theme }) => theme.space.lg}px;
  padding-top: 30px;
  background-color: ${({ theme }) => theme.colors.darkGrey};
  color: ${({ theme }) => theme.colors.pebble};
`
