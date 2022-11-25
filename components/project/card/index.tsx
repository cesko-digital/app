import { ArrowIcon, GithubIcon, JiraIcon, SlackIcon } from "components/icons";
import Coordinators from "./coordinators";
import SocialMedia from "./social-media";
import { ButtonAsLink } from "components/links";
import * as S from "./styles";
import strings from "content/strings.json";
import { PortalProject } from "lib/airtable/project";
import { TeamEngagement } from "lib/airtable/team-engagement";
import { doNotTranslate } from "lib/utils";

interface Props {
  project: PortalProject;
  coordinators: readonly TeamEngagement[];
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
          <S.InnerText className={doNotTranslate}>{project.name}</S.InnerText>
          <ArrowIcon />
        </ButtonAsLink>
      </S.ButtonWrapper>
    </S.Container>
  );
};

export default ProjectCard;
