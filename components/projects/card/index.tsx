import {
  ArrowIcon,
  GithubIcon,
  JiraIcon,
  SlackIcon,
} from "components/shared/icons";
import Coordinators from "./coordinators";
import SocialMedia from "./social-media";
import ButtonAsLink from "components/shared/link";
import { PortalProject, PortalUser } from "lib/portal-types";
import * as S from "./styles";
import strings from "content/strings.json";

interface Props {
  project: PortalProject;
  coordinators: readonly PortalUser[];
}

const ProjectCard: React.FC<Props> = ({ project, coordinators }) => {
  const msg = strings.pages.project.projectCard;
  const haveLinks =
    project.githubUrl ||
    project.trelloUrl ||
    project.jiraUrl ||
    project.slackChannelUrl;
  return (
    <S.Container>
      {project.coordinatorIds.length > 0 && (
        <S.Wrapper>
          <Coordinators coordinators={coordinators} />
        </S.Wrapper>
      )}
      {haveLinks && (
        <S.Social>
          <S.Title>{msg.links}</S.Title>
          {project.githubUrl && (
            <SocialMedia
              logo={GithubIcon}
              url={project.githubUrl}
              name={"GitHub"}
            />
          )}
          {project.jiraUrl && (
            <SocialMedia logo={JiraIcon} url={project.jiraUrl} name={"Jira"} />
          )}
          {project.slackChannelUrl && (
            <SocialMedia
              logo={SlackIcon}
              url={project.slackChannelUrl}
              name="Slack"
            />
          )}
        </S.Social>
      )}
      <S.ButtonWrapper>
        <ButtonAsLink to={project.url}>
          <S.InnerText>{project.name}</S.InnerText>
          <ArrowIcon />
        </ButtonAsLink>
      </S.ButtonWrapper>
    </S.Container>
  );
};

export default ProjectCard;
