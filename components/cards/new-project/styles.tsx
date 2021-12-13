import styled from "styled-components";
import { Body } from "components/typography";
import { ButtonAsLink } from "components/links";

export const Wrapper = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  max-width: 308px;
  border: ${({ theme }) => `2px solid ${theme.colors.lightGray}`};
  border-radius: ${({ theme }) => theme.borderRadius.base}px;
  padding: ${({ theme }) => theme.space.lg}px;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-top: 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 20px;
  }
`;

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl}px;
  color: ${({ theme }) => theme.colors.darkGrey};
  line-height: ${({ theme }) => theme.lineHeights.heading};
  text-align: left;
  font-weight: bold;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 100%;
  }
`;

export const Description = styled(Body)`
  margin-bottom: 18px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    justify-content: center;
  }
`;

export const ButtonAsLinkElement = styled(ButtonAsLink)`
  display: flex;
  justify-content: flex-start;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0px 60px;
    white-space: nowrap;
  }
`;
