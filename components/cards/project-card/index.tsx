import * as S from "./styles";
import { Link } from "components/links";
import { getResizedImgUrl } from "lib/utils";
import strings from "content/strings.json";
import { PortalProject } from "lib/portal-types";
import { Route } from "lib/utils";

interface Props {
  project: PortalProject;
}

const ProjectCard: React.FC<Props> = ({ project, ...rest }) => {
  const msg = strings.cards.project;
  return (
    <S.Card {...rest}>
      <S.Header>
        <S.Cover url={getResizedImgUrl(project.coverImageUrl, 758)} />
        <S.Logo url={project.logoUrl} />
      </S.Header>
      <S.Content>
        <S.Title>{project.name}</S.Title>
        <S.Description>{project.tagline}</S.Description>
        <Link to={Route.toProject(project)}>{msg.projectDetail}</Link>
      </S.Content>
    </S.Card>
  );
};

export default ProjectCard;
