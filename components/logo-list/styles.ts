import styled from "styled-components";
import { Heading2 } from "components/typography";

const LOGO_WIDTH_PX = 160;
const LOGO_MOBILE_WIDTH_PX = 144;

export const MainTitle = styled(Heading2)`
  margin: 0 0 65px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 40px;
  }
`;

export const List = styled.ul`
  display: grid;
  grid-gap: 24px 90px;
  grid-template-columns: repeat(auto-fill, ${LOGO_WIDTH_PX}px);
  list-style-type: none;
  padding: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fill, ${LOGO_MOBILE_WIDTH_PX}px);
    grid-gap: 24px 24px;
    margin-bottom: 65px;
  }
`;
export const Item = styled.li``;

export const Link = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${LOGO_WIDTH_PX}px;
  height: 80px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: ${LOGO_MOBILE_WIDTH_PX}px;
  }
`;

export const Logo = styled.img`
  max-width: 100%;
  max-height: 100%;
  height: auto;
`;
