import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { getAllEvents, getAllProjects, getAllUsers } from "lib/airtable-import";
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

type PageProps = {
  event: PortalEvent;
  project: PortalProject;
  allEvents: PortalEvent[];
  owner: PortalUser;
};

const Page: NextPage<PageProps> = ({ event, project, owner, allEvents }) => {
  const coverImageUrl = event.coverImageUrl || project.coverImageUrl;
  const otherEvents = allEvents.filter(
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

// TODO: Can we type this tighter?
export const getStaticPaths: GetStaticPaths = async () => {
  const apiKey = process.env.AIRTABLE_API_KEY as string;
  const events = await getAllEvents(apiKey);
  const paths = events.map((event) => ({
    params: { slug: event.slug },
  }));
  return {
    paths,
    fallback: false,
  };
};

// TODO: Can we type this tighter?
export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const apiKey = process.env.AIRTABLE_API_KEY as string;
  const events = await getAllEvents(apiKey);
  const event = events.find((e) => e.slug === params!.slug)!;
  const projects = await getAllProjects(apiKey);
  const project = projects.find((p) => p.id === event.projectId)!;
  const users = await getAllUsers(apiKey);
  const owner = users.find((u) => u.id === event.ownerId)!;
  return {
    props: prepareToSerialize({ event, allEvents: events, project, owner }),
  };
};

export default Page;
