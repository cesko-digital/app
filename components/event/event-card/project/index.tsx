import { doNotTranslate, Route } from "lib/utils";
import * as S from "./styles";
import strings from "content/strings.json";
import { PortalProject } from "lib/airtable/project";

interface ProjectProps {
  project: PortalProject;
}

const Project: React.FC<ProjectProps> = ({ project }) => {
  let wrapper;
  if (project.state === "draft" || project.state === "internal") {
    wrapper = (
      <S.Wrapper>
        <S.Avatar src={project.logoUrl} />
        <S.AvatarTitle className={doNotTranslate}>{project.name}</S.AvatarTitle>
      </S.Wrapper>
    );
  } else {
    wrapper = (
      <S.LinkWrapper href={Route.toProject(project)}>
        <S.Avatar src={project.logoUrl} />
        <S.AvatarTitle className={doNotTranslate}>{project.name}</S.AvatarTitle>
      </S.LinkWrapper>
    );
  }
  return (
    <S.Project>
      <S.Title>{strings.components.cards.eventCard.project}</S.Title>
      {wrapper}
    </S.Project>
  );
};

export default Project;
