import styled from "styled-components";
import { BodyBig, Heading2 } from "components/typography";
import Link from "components/shared/link";

export const AboutSectionWrapper = styled.div`
  display: flex;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: 100px 0;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column-reverse;
  }
`;

export const DescriptionWrapper = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex: 5;
    margin-right: 60px;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-right: 100px;
  }
`;

export const ProjectCardWrapper = styled.div`
  flex: 2;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 48px;
  }
`;

export const Tagline = styled(BodyBig)`
  margin: 16px 0;
`;

export const CoverImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 8px;
  margin-top: 50px;
  max-height: 560px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: 24px -20px -20px -20px;
    border-radius: 0;
  }
`;

export const CoverImage = styled.img`
  width: 100%;
`;

export const ContributeWrapper = styled.div`
  margin: 30px 0;
  display: flex;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: 100px 0;
  }
`;

export const RelatedContentWrapper = styled.div`
  margin-top: 18px;
  margin-bottom: 70px;
`;

export const CardRowWrapper = styled.div`
  margin-top: 18px;
  margin-bottom: 70px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
    margin-left: -${({ theme }) => theme.space.outer}px;
    margin-right: -${({ theme }) => theme.space.outer}px;
    margin-bottom: 20px;
  }
`;

export const TitleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
    padding: 0;
  }
`;

export const Title = styled(Heading2)`
  margin-bottom: 14px;
`;

export const AccessoryLink = styled(Link)`
  margin-bottom: 18px;
`;
