import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { PortalEvent, PortalProject, PortalUser } from "lib/portal-types";
import { prepareToSerialize } from "lib/utils";
import * as Typography from "components/typography";
import { Layout, Section, SectionContent } from "components/layout";
import * as S from "components/event/styles";
import EventCard from "components/event/event-card";
import { Link } from "components/links";
import { CardRow } from "components/layout";
import { getResizedImgUrl } from "lib/utils";
import RenderMarkdown from "components/markdown";
import { ParsedUrlQuery } from "querystring";
import { appState } from "lib/app-state";

interface PageProps {
  event: PortalEvent;
  project: PortalProject;
  events: PortalEvent[];
  owner: PortalUser;
}

interface QueryParams extends ParsedUrlQuery {
  slug: string;
}

const Page: NextPage<PageProps> = ({ event, project, owner, events }) => {
  const coverImageUrl = event.coverImageUrl || project.coverImageUrl;
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
                  <S.ProjectCard key={index} event={event} project={project} />
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
  const paths = appState.events.map((event) => ({
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
  const { projects, users, events } = appState;
  const event = appState.events.find((e) => e.slug === slug)!;
  const project = projects.find((p) => p.id === event.projectId)!;
  const owner = users.find((u) => u.id === event.ownerId)!;
  return {
    props: prepareToSerialize({ event, events, project, owner }),
  };
};

export default Page;
