import styled from "styled-components";
import { Heading2 } from "../../components/typography";
import EventCard from "./event-card";

export const Container = styled.div`
  margin: 50px 0 50px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: 40px -${({ theme }) => theme.space.outer}px;
  }
`;

export const CategoryHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export const Title = styled(Heading2)``;

export const CardWrapper = styled.div`
  display: grid; // this fixes collapsed right padding in overflow
  margin: 30px 0 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    overflow-x: scroll;
    margin-top: 8px;
  }
`;

export const ProjectCard = styled(EventCard)`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-width: 264px;
  }
`;

export const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 22px;
  a {
    text-decoration: none;
  }
`;

export const OpportunitiesMainWrapper = styled.div`
  margin-top: 18px;
`;

export const CompetencyFilterLabel = styled.div`
  display: inline-box;
  vertical-align: middle;
  cursor: pointer;
`;

export const CompetencyFilterRadio = styled.input`
  display: inline-box;
  vertical-align: middle;
  margin: 1px 5px -2px 15px;
  cursor: pointer;
`;
