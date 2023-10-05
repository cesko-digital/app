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
  const links = project.links || [];
  const featuredLink = links.find((link) => link.featured);
  const ordinaryLinks = links.filter((link) => link !== featuredLink);
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
  const ICONS_BY_PAGES = {
    "https://cesko-digital.slack.com": SlackIcon,
    "https://app.slack.com/": SlackIcon,
    "https://github.com": GithubIcon,
    "https://cesko-digital.atlassian.net/jira/": JiraIcon,
    "https://trello.com": TrelloIcon,
    "https://cesko-digital.atlassian.net": ConfluenceIcon,
    "https://miro.com": MiroIcon,
    "https://youtube.com": YouTubeIcon,
    "https://app.asana.com": AsanaIcon,
    "https://calendar.google.com": GoogleCalendarIcon,
    "https://docs.google.com": GoogleDocsIcon,
    "https://drive.google.com": GoogleDriveIcon,
    "https://www.figma.com": FigmaIcon,
  };

  for (const [page, icon] of Object.entries(ICONS_BY_PAGES)) {
    if (url.startsWith(page)) {
      return icon;
    }
  }

  return WebsiteIcon;
};

export default ProjectCard;
