import styled from "styled-components";
import { Heading4 } from "components/typography";
import { Button } from "components/buttons";

export const CoverImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 8px;
  position: relative;
  max-height: 560px;
  margin-top: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: 24px -20px -20px -20px;
    border-radius: 0;
  }
`;

export const CoverImage = styled.img`
  width: 100%;
  filter: grayscale(100%);
`;

export const OpportunityHeader = styled.div`
  display: flex;
  margin-top: 50px;
  a {
    text-decoration: none;
  }

  flex-direction: row;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
  }
`;
export const OpportunityContactCard = styled.div`
  width: 350px;
  margin-left: 32px;
  border-radius: 8px;
  padding: 0 24px 24px;
  background: #f9f9f9;
  flex-shrink: 0;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: auto;
    margin: 0;
  }
`;

export const OwnerWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0 0;
`;

export const OpportunityOwnerWrapper = styled.div`
  padding: 24px 0;
  margin-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

export const OwnerImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 20px;
  background: blue;
`;

export const OwnerName = styled(Heading4)`
  font-size: 18px;
`;

export const OpportunityMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  svg {
    fill: ${({ theme }) => theme.colors.darkGrey};
  }
`;
export const OpportunityDescription = styled.div`
  padding: 24px 0;
  flex-grow: 1;
`;

export const OpportunityProjectImg = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;

export const OpportunitySlackButton = styled(Button)`
  font-size: 16px;
  width: 100%;
`;
