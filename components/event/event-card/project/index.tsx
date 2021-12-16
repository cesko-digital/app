import { PortalProject } from "lib/portal-types";
import { Route } from "lib/routing";
import * as S from "./styles";

interface ProjectProps {
  project: PortalProject;
}

const Project: React.FC<ProjectProps> = ({ project }) => {
  let wrapper;
  if (project.silent) {
    wrapper = (
      <S.Wrapper>
        <S.Avatar src={project.logoUrl} />
        <S.AvatarTitle>{project.name}</S.AvatarTitle>
      </S.Wrapper>
    );
  } else {
    wrapper = (
      <S.LinkWrapper href={Route.toProject(project)}>
        <S.Avatar src={project.logoUrl} />
        <S.AvatarTitle>{project.name}</S.AvatarTitle>
      </S.LinkWrapper>
    );
  }
  return (
    <S.Project>
      <S.Title>Projekt</S.Title>
      {wrapper}
    </S.Project>
  );
};

export default Project;
