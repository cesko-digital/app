import { ProjectCard } from "components/cards";
import { Route } from "lib/routing";
import { PortalProject } from "lib/portal-types";
import styled from "styled-components";

interface Props {
  projects: PortalProject[];
}

const OngoingProjects: React.FC<Props> = ({ projects }) => (
  <Container>
    {projects.map((project) => (
      <ProjectCard
        key={project.slug}
        title={project.name}
        description={project.tagline}
        cover={project.coverImageUrl}
        logo={project.logoUrl}
        link={Route.toProject(project)}
        tags={[] /* TBD */}
      />
    ))}
  </Container>
);

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => `${theme.space.md}px ${theme.space.md}px`};
  margin-top: ${({ theme }) => theme.space.md}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export default OngoingProjects;
