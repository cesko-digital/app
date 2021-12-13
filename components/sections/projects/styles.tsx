import styled from "styled-components";
import { ProjectCard as OriginalProjectCard } from "components/cards";
import { Link } from "components/links";
import { Heading2 } from "components/typography";

export const Container = styled.div`
  margin: 130px 0 94px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: 48px -${({ theme }) => theme.space.outer}px;
  }
`;

export const TitleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
    padding: 0 ${({ theme }) => theme.space.outer}px;
  }
`;

export const Title = styled(Heading2)`
  margin-bottom: 14px;
`;

export const ShowAll = styled(Link)`
  margin-bottom: 18px;
`;

export const CardWrapper = styled.div`
  display: grid; // this fixes collapsed right padding in overflow
  margin: 30px 0 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    overflow-x: scroll;
    margin-top: 8px;
  }
`;

export const ProjectCard = styled(OriginalProjectCard)`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-width: 264px;
  }
`;
