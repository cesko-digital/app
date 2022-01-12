import styled from "styled-components";
import { Heading1, BodyBig, Heading2 } from "components/typography";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  overflow-wrap: break-word;
`;

export const Heading = styled(Heading1)`
  margin: 50px 0 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 38px;
  }
`;
export const Tagline = styled(BodyBig)`
  margin-bottom: 130px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 56px;
  }
`;

export const ProjectsHeading = styled(Heading2)`
  margin-bottom: 30px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 17px;
  }
`;
