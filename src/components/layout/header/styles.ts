import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Logo = styled.div`
  background-image: url('assets/logo.svg');
  width: 182px;
  height: 36px;
`

export const LinksContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 40px;
`
