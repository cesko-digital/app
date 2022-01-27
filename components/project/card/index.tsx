import { ArrowIcon, GithubIcon, JiraIcon, SlackIcon } from "components/icons";
import Coordinators from "./coordinators";
import SocialMedia from "./social-media";
import { ButtonAsLink } from "components/links";
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
    (project.slackChannelName && project.slackChannelUrl);
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
          {project.slackChannelName && project.slackChannelUrl && (
            <SocialMedia
              logo={SlackIcon}
              url={project.slackChannelUrl}
              name="Slack" // We have quite long channel names, so let’s not use the channel name here
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
