import * as S from "./styles";
import { ButtonAsLink } from "components/links";
import strings from "content/strings.json";
import { PortalProject } from "lib/portal-types";
import { Route } from "lib/utils";
import { getResizedImgUrl } from "lib/utils";

interface Props {
  project: PortalProject;
}

const HighlightedProject: React.FC<Props> = ({ project }) => {
  return (
    <S.Container>
      <S.ProjectImage src={getResizedImgUrl(project.coverImageUrl, 1160)} />
      <S.Content>
        <S.ProjectInfo>
          <S.Avatar src={project.logoUrl} />
          <S.Name>{project.name}</S.Name>
          <S.Tagline>{project.tagline}</S.Tagline>
          <ButtonAsLink inverted to={Route.toProject(project)}>
            {strings.cards.project.projectDetail}
          </ButtonAsLink>
        </S.ProjectInfo>
      </S.Content>
    </S.Container>
  );
};

export default HighlightedProject;
