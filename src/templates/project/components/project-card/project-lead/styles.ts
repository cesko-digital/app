import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 300px;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }
`

export const Title = styled.h2`
  margin: 32px 0 20px;
  font-weight: ${({ theme }) => theme.fontWeights.heading};
  font-size: ${({ theme }) => theme.fontSizes.base}px;
  line-height: ${({ theme }) => theme.lineHeights.body};
  color: ${({ theme }) => theme.colors.darkGrey};
`

export const Name = styled.h2`
  margin: 0;
  font-weight: ${({ theme }) => theme.fontWeights.heading};
  font-size: ${({ theme }) => theme.fontSizes.base}px;
  line-height: ${({ theme }) => theme.lineHeights.body};
  color: ${({ theme }) => theme.colors.darkGrey};
`

export const Perex = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.small}px;
  line-height: ${({ theme }) => theme.lineHeights.body};
  color: ${({ theme }) => theme.colors.darkGrey};
  opacity: 0.8;
`

const AVATAR_SIZE = 60

export const Container = styled.div`
  display: flex;
  align-items: center;
`

export const Image = styled.div<{ url: string }>`
  width: ${AVATAR_SIZE}px;
  height: ${AVATAR_SIZE}px;
  background-color: ${({ theme }) => theme.colors.stone};
  background-image: url(${({ url }) => url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0% 25%;
  border-radius: 50%;
  margin-right: 20px;
`

export const Text = styled.div`
  display: flex;
  flex-direction: column;
`
