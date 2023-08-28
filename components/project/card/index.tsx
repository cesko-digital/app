import {
  AsanaIcon,
  ConfluenceIcon,
  FigmaIcon,
  GithubIcon,
  GoogleCalendarIcon,
  GoogleDocsIcon,
  GoogleDriveIcon,
  JiraIcon,
  MiroIcon,
  SlackIcon,
  TrelloIcon,
  WebsiteIcon,
  YouTubeIcon,
} from "components/icons";
import { ButtonLink } from "components/links";
import { PortalProject } from "lib/airtable/project";
import { TeamEngagement } from "lib/airtable/team-engagement";
import Coordinators from "./coordinators";
import SocialMedia from "./social-media";
import * as S from "./styles";

interface Props {
  project: PortalProject;
  coordinators: readonly TeamEngagement[];
}

const ProjectCard: React.FC<Props> = ({ project, coordinators }) => {
  const featuredLink = project.links.find((link) => link.featured);
  const ordinaryLinks = project.links.filter((link) => link !== featuredLink);
  return (
    <S.Container>
      {coordinators.length > 0 && (
        <S.Wrapper>
          <Coordinators coordinators={coordinators} />
        </S.Wrapper>
      )}
      {ordinaryLinks.length > 0 && (
        <S.Social>
          <S.Title>Odkazy</S.Title>
          {ordinaryLinks.map((link) => (
            <SocialMedia
              key={link.url}
              logo={iconForUrl(link.url)}
              url={link.url}
              name={link.name}
            />
          ))}
        </S.Social>
      )}
      {featuredLink && (
        <S.ButtonWrapper>
          <ButtonLink to={featuredLink.url}>
            <S.InnerText>{featuredLink.name}</S.InnerText>
          </ButtonLink>
        </S.ButtonWrapper>
      )}
    </S.Container>
  );
};

const iconForUrl = (url: string) => {
  if (
    url.startsWith("https://cesko-digital.slack.com") ||
    url.startsWith("https://app.slack.com/")
  ) {
    return SlackIcon;
  } else if (url.startsWith("https://github.com")) {
    return GithubIcon;
  } else if (url.startsWith("https://cesko-digital.atlassian.net/jira/")) {
    return JiraIcon;
  } else if (url.startsWith("https://trello.com")) {
    return TrelloIcon;
  } else if (url.startsWith("https://cesko-digital.atlassian.net")) {
    return ConfluenceIcon;
  } else if (url.startsWith("https://miro.com")) {
    return MiroIcon;
  } else if (url.startsWith("https://youtube.com")) {
    return YouTubeIcon;
  } else if (url.startsWith("https://app.asana.com")) {
    return AsanaIcon;
  } else if (url.startsWith("https://calendar.google.com")) {
    return GoogleCalendarIcon;
  } else if (url.startsWith("https://docs.google.com")) {
    return GoogleDocsIcon;
  } else if (url.startsWith("https://drive.google.com")) {
    return GoogleDriveIcon;
  } else if (url.startsWith("https://www.figma.com")) {
    return FigmaIcon;
  } else {
    return WebsiteIcon;
  }
};

export default ProjectCard;
