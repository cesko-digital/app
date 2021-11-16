import styled from 'styled-components'

export const VideoWrapper = styled.div`
  padding-top: 56.25%;
  position: relative;
`

export const VideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const TwoColumnLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 50px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
  }
`

export const MainColumn = styled.div`
  flex-grow: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    order: 2;
  }
`

export const BoxesColumn = styled.div`
  max-width: 400px;
  margin-left: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-left: 0px;
    max-width: 1024px;
    order: 1;
  }
`
