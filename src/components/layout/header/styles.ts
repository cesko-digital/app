import styled from 'styled-components'
import logo from 'images/logo.svg'
import mobileLogo from 'images/logo-mobile.svg'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
`

export const Logo = styled.div`
  background-image: url(${logo});
  width: 182px;
  height: 36px;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    background-image: url(${mobileLogo});
    background-repeat: no-repeat;
    background-size: contain;
    width: 32px;
  }
`

export const DesktopLinksContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 40px;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`

export const MobileLinksContainer = styled.div`
  display: none;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 24px;
  }
`

export const MobileMenu = styled.div`
  display: none;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: grid;
    grid-row-gap: 40px;
    align-content: start;
    justify-items: end;
    padding-left: 40px;
    padding-right: 40px;
    position: fixed;
    top: 100px;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background: rgba(255, 255, 255, 0.9);
  }
`

export const IconButton = styled.button`
  background: none;
  border: none;
`
