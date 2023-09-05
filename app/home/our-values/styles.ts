import styled from "styled-components";
import {
  Heading2,
  BodyBig,
  bodyBigStyles,
  Heading4,
  Body,
  bodyStyles,
} from "components/typography";

const ICON_SIZE = 72;

export const Container = styled.div`
  padding: 130px 0;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 43px 0;
  }
`;

export const MainTitle = styled(Heading2)`
  margin: 0 0 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 6px;
  }
`;

export const MainPerex = styled(BodyBig)`
  margin-bottom: 104px;

  color: ${({ theme }) => theme.colors.asphalt};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: ${({ theme }) => theme.space.lg}px;
    font-size: ${({ theme }) => theme.fontSizes.md}px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 72%;
    ${bodyBigStyles}
  }
`;

export const WadgeContainer = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
  position: absolute;
  top: 100px;
  right: 0;
`;

export const WadgeIconContainerTop = styled.div``;

export const WadgeIconContainerBottom = styled.div`
  margin-left: 85px;
`;

export const ValuesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  // consider the last row margin of flex items
  margin-bottom: -${({ theme }) => theme.space.xl}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    // consider the last row margin of flex items
    margin-bottom: -55px;
  }
`;

export const ValueWrapper = styled.div`
  width: 326px;
  margin-right: 60px;
  margin-bottom: ${({ theme }) => theme.space.xl}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    margin-bottom: 55px;
  }
`;

export const ValueTitle = styled(Heading4)`
  margin: 25px 0 0;
`;

export const ValuePerex = styled(Body)`
  margin: 0;
  opacity: 0.8;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    ${bodyStyles}
  }
`;

export const ValueIconContainer = styled.div`
  width: ${ICON_SIZE}px;
  height: ${ICON_SIZE}px;

  svg {
    width: 100%;
    height: 100%;
  }
`;
