import * as S from "./styles";
import { CardRow } from "components/layout";
import { PortalProject } from "lib/portal-types";
import strings from "content/strings.json";
import { Route } from "lib/routing";

const msg = strings.components.sections.projects;

export type Props = {
  title?: string;
  projects: PortalProject[];
};

const Projects: React.FC<Props> = ({ projects, title = msg.ourProjects }) => {
  return (
    <S.Container>
      <S.TitleRow>
        <S.Title>{title}</S.Title>
        <S.ShowAll to={"/projekty"}>{msg.showAll}</S.ShowAll>
      </S.TitleRow>
      <S.CardWrapper>
        <CardRow>
          {projects.map((project, index) => (
            <S.ProjectCard
              key={index}
              title={project.name}
              description={project.tagline}
              cover={project.coverImageUrl}
              logo={project.logoUrl}
              link={Route.toProject(project)}
              tags={[] /* TBD */}
            />
          ))}
        </CardRow>
      </S.CardWrapper>
    </S.Container>
  );
};

export default Projects;
