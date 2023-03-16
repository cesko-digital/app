import * as S from "./styles";
import { ButtonLink } from "components/links";
import strings from "content/strings.json";
import { doNotTranslate, Route } from "lib/utils";
import { getResizedImgUrl } from "lib/utils";
import { PortalProject } from "lib/airtable/project";

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
          <S.Name className={doNotTranslate}>{project.name}</S.Name>
          <S.Tagline>{project.tagline}</S.Tagline>
          <ButtonLink inverted to={Route.toProject(project)}>
            {strings.cards.project.projectDetail}
          </ButtonLink>
        </S.ProjectInfo>
      </S.Content>
    </S.Container>
  );
};

export default HighlightedProject;
