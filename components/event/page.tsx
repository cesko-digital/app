import { PortalEvent, PortalProject, PortalUser } from "lib/portal-types";
import { Route } from "lib/routing";
import { Layout, Section, SectionContent, CardRow } from "components/layout";
import { Link } from "components/links";
import { getResizedImgUrl } from "lib/utils";
import RenderMarkdown from "components/markdown";
import strings from "content/strings.json";
import EventCard from "./event-card";
import * as Typography from "components/typography";
import * as S from "./styles";

interface PageProps {
  event: PortalEvent;
  project: PortalProject;
  projects: readonly PortalProject[];
  events: readonly PortalEvent[];
  owner: PortalUser;
}

const EventPage: React.FC<PageProps> = (props) => {
  const { event, project, projects, owner, events } = props;
  const coverImageUrl = event.coverImageUrl || project.coverImageUrl;
  const getEventProject = (e: PortalEvent) =>
    projects.find((p) => p.id === e.projectId)!;
  const otherEvents = events.filter(
    (e) => e.status === "live" && e.id !== event.id
  );
  return (
    <Layout
      crumbs={[
        { path: Route.dashboard, label: strings.crumbs.dashboard },
        { label: event.name },
      ]}
      head={{
        title: event.name,
        description: event.summary,
        coverUrl: coverImageUrl,
      }}
    >
      <Section>
        <SectionContent>
          <Typography.Heading1>{event.name}</Typography.Heading1>
          <Typography.Body>{event.summary}</Typography.Body>
          <S.CoverImageWrapper>
            <S.CoverFilter />
            <S.CoverImage
              src={getResizedImgUrl(coverImageUrl, 1160)}
              loading="lazy"
            />
          </S.CoverImageWrapper>
        </SectionContent>
      </Section>
      <Section>
        <SectionContent>
          <S.TwoColumnLayout>
            <S.MainColumn>
              <Typography.Body>
                <RenderMarkdown source={event.description} />
              </Typography.Body>
            </S.MainColumn>
            <S.ReminderColumn>
              <EventCard event={event} owner={owner} project={project} />
            </S.ReminderColumn>
          </S.TwoColumnLayout>
        </SectionContent>
      </Section>
      <Section>
        <SectionContent>
          <S.Container>
            <S.CategoryHeader>
              <S.Title>Další akce</S.Title>
              <Link to={Route.dashboard}>Všechny příležitosti</Link>
            </S.CategoryHeader>
            <S.CardWrapper>
              <CardRow>
                {otherEvents.slice(0, 3).map((event, index) => (
                  <S.ProjectCard
                    key={index}
                    event={event}
                    project={getEventProject(event)}
                  />
                ))}
              </CardRow>
            </S.CardWrapper>
          </S.Container>
        </SectionContent>
      </Section>
    </Layout>
  );
};

export default EventPage;
