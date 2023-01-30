import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import * as Typography from "components/typography";
import { Layout, Section, SectionContent } from "components/layout";
import * as S from "components/event/styles";
import EventCard from "components/event/event-card";
import { Link } from "components/links";
import { CardRow } from "components/layout";
import { getResizedImgUrl } from "lib/utils";
import RenderMarkdown from "components/markdown";
import { ParsedUrlQuery } from "querystring";
import { Route } from "lib/utils";
import strings from "content/strings.json";
import { PortalUser } from "lib/airtable/user";
import { PortalProject } from "lib/airtable/project";
import {
  compareEventsByTime,
  isEventPast,
  PortalEvent,
} from "lib/airtable/event";
import { filterUndefines, getDataSource } from "lib/site-data";

interface PageProps {
  event: PortalEvent;
  project: PortalProject;
  projects: readonly PortalProject[];
  otherEvents: PortalEvent[];
  owner: PortalUser;
}

interface QueryParams extends ParsedUrlQuery {
  slug: string;
}

const Page: NextPage<PageProps> = (props) => {
  const { event, project, projects, owner, otherEvents } = props;
  const coverImageUrl = event.coverImageUrl || project.coverImageUrl;

  const getEventProject = (e: PortalEvent) =>
    projects.find((p) => p.id === e.projectId)!;

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
                {otherEvents.map((event, index) => (
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

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const events = await getDataSource().events();
  const paths = events.map((event) => ({
    params: { slug: event.slug },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PageProps, QueryParams> = async (
  context
) => {
  const { slug } = context.params!;
  const dataSource = getDataSource();
  const [projects, users, events] = await Promise.all([
    dataSource.projects(),
    dataSource.users(),
    dataSource.events(),
  ]);
  const event = events.find((e) => e.slug === slug);
  if (!event) {
    return { notFound: true };
  }
  const project = projects.find((p) => p.id === event.projectId)!;
  const owner = users.find((u) => u.id === event.ownerId)!;
  const otherEvents = events
    .filter((e) => e.status === "live" && e.id !== event.id)
    .sort(compareByRelevance)
    .slice(0, 3);
  return {
    props: filterUndefines({
      event,
      otherEvents,
      project,
      projects,
      owner,
    }),
    notFound: !event || !project || !owner,
    // Regenerate every five minutes to refresh event info
    revalidate: 60 * 5,
  };
};

/** Sort future events first, sorted ascending date */
const compareByRelevance = (a: PortalEvent, b: PortalEvent) => {
  const pastA = isEventPast(a);
  const pastB = isEventPast(b);
  if (pastA && !pastB) {
    return 1; // a after b
  } else if (pastB && !pastA) {
    return -1; // a before b
  } else {
    return compareEventsByTime(a, b);
  }
};

export default Page;
