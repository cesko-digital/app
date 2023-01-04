import { StyledLink } from "components/links/link/styles";
import styled from "styled-components";
import { ButtonAsLink } from "components/links";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    z-index: 100;
  }
`;

export const Logo = styled.div`
  background-image: url("/images/logo.svg");
  width: 182px;
  height: 36px;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    background-image: url("/images/logo-mobile.svg");
    background-repeat: no-repeat;
    background-size: contain;
    width: 32px;
    z-index: 100;
  }
`;

export const HeaderButton = styled(ButtonAsLink)`
  height: 44px !important;
  padding: 0 24px;
  font-size: ${({ theme }) => theme.fontSizes.small}px;
`;

export const DesktopLinksContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 40px;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

export const MobileLinksContainer = styled.div`
  display: none;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 24px;
    z-index: 100;
  }
`;

export const MobileMenu = styled.div`
  display: none;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: grid;
    grid-row-gap: 15px;
    align-content: start;
    justify-items: end;
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 100px;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 90;
    background: rgba(255, 255, 255, 0.9);
  }

  > ${StyledLink} {
    display: grid;
    justify-self: stretch;
    height: 48px;
    text-align: right;
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
`;
