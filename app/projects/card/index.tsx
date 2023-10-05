import {
  AirtableIcon,
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

/**
 * Returns a hostname of the provided URL without the "www." prefix.
 */
const getHostname = (url: string): string => {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
};

const iconForUrl = (url: string) => {
  const ICONS_BY_PAGES = {
    "cesko-digital.slack.com": SlackIcon,
    "app.slack.com": SlackIcon,
    "github.com": GithubIcon,
    "cesko-digital.atlassian.net/jira": JiraIcon,
    "trello.com": TrelloIcon,
    "cesko-digital.atlassian.net": ConfluenceIcon,
    "miro.com": MiroIcon,
    "youtube.com": YouTubeIcon,
    "app.asana.com": AsanaIcon,
    "calendar.google.com": GoogleCalendarIcon,
    "docs.google.com": GoogleDocsIcon,
    "drive.google.com": GoogleDriveIcon,
    "figma.com": FigmaIcon,
    "airtable.com": AirtableIcon,
  };

  const hostname = getHostname(url);
  for (const [page, icon] of Object.entries(ICONS_BY_PAGES)) {
    if (hostname.startsWith(page)) {
      return icon;
    }
  }

  return WebsiteIcon;
};

export default ProjectCard;
