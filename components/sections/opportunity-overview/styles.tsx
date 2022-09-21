import styled from "styled-components";
import { heading4Styles } from "components/typography";

export const Container = styled.div`
  max-width: ${({ theme }) => theme.contentSize}px;
  margin: 0 auto;
`;

export const OpportunityWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px 0;
  border-bottom: 1px solid #f0f0f2;
  gap: 1rem;
  a {
    text-decoration: none;
  }
`;

export const OpportunityHeading = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.base}px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.small}px;
  }

  ${heading4Styles}
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkGrey};
`;

export const OpportunityMetaWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin-top: 2px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

export const OpportunityRightWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const OpportunityRightContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;

  a {
    text-decoration: none;
    border-bottom: 1px solid transparent;
  }
  a:hover {
    border-bottom: 1px solid #080831;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.base}px;
    flex-direction: column-reverse;
    align-items: center;
    text-align: center;
    gap: 0;
    width: 120px;
  }
`;

export const OpportunityLogo = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: gray;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 16px;
  }
`;
