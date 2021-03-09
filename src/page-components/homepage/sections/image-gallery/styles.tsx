import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  margin: 96px auto;
  height: 240px;
  position: relative;
  z-index: 0;
  overflow: hidden;
`

export const ContainerCentered = styled.div`
  display: flex;
  min-width: 1160px;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    left: -50%;
    position: relative;
  }
`

export const Row = styled.div<{ ratio: number}>`
  display: flex;
  height: calc(${(props) => props.ratio}% - ${(props) => (100/props.ratio - 1) * 8}px);
  width: auto;
  justify-content: center;
  > * + * {
    margin-left: 16px;
  }`

export const Col = styled.div<{ ratio: number }>`
  display: flex;
  width: ${(props) => props.ratio}%;
  height: auto;
  flex-direction: column;
  > * + * {
    margin-top: 16px;
  }
`

export const Img = styled.img<{ ratio: number }>`
  border-radius: ${({ theme }) => theme.borderRadius.base}px;
  height: 100%;
  object-fit: cover;
  width: calc(${(props) => props.ratio}% - 16px);
  align-self: center;
`