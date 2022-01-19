import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { PortalEvent, PortalProject, PortalUser } from "lib/portal-types";
import * as Typography from "components/typography";
import { Layout, Section, SectionContent } from "components/layout";
import * as S from "components/event/styles";
import EventCard from "components/event/event-card";
import { Link } from "components/links";
import { CardRow } from "components/layout";
import { getResizedImgUrl } from "lib/utils";
import RenderMarkdown from "components/markdown";
import { ParsedUrlQuery } from "querystring";
import { siteData } from "lib/site-data";

interface PageProps {
  event: PortalEvent;
  project: PortalProject;
  projects: readonly PortalProject[];
  events: readonly PortalEvent[];
  owner: PortalUser;
}

interface QueryParams extends ParsedUrlQuery {
  slug: string;
}

const Page: NextPage<PageProps> = (props) => {
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
        { path: "/portal-dobrovolnika", label: "Portál dobrovolníka" },
        { label: event.name },
      ]}
      seo={{
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
              <Link to="/portal-dobrovolnika">Všechny příležitosti</Link>
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

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const paths = siteData.events.map((event) => ({
    params: { slug: event.slug },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps, QueryParams> = async (
  context
) => {
  const { slug } = context.params!;
  const { projects, users, events } = siteData;
  const event = siteData.events.find((e) => e.slug === slug)!;
  const project = projects.find((p) => p.id === event.projectId)!;
  const owner = users.find((u) => u.id === event.ownerId)!;
  return {
    props: { event, events, project, projects, owner },
  };
};

export default Page;
