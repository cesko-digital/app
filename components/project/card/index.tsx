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
    project.githubUrl.length ||
    project.trelloUrl.length ||
    project.jiraUrl.length ||
    project.slackChannelUrl.length;
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
          {project.githubUrl.map((url, index) => (
            <SocialMedia
              key={`github-${index}`}
              logo={GithubIcon}
              url={url}
              name={"GitHub"}
            />
          ))}
          {project.jiraUrl.map((url, index) => (
            <SocialMedia
              key={`jira-${index}`}
              logo={JiraIcon}
              url={url}
              name={"Jira"}
            />
          ))}
          {project.slackChannelUrl.map((url, index) => (
            <SocialMedia
              key={`slack-${index}`}
              logo={SlackIcon}
              url={url}
              name="Slack"
            />
          ))}
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
