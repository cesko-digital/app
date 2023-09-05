import Markdoc from "@markdoc/markdoc";
import { JoinUsBox } from "components/join-us";
import { allCustomTags } from "app/projects/CustomTags";
import { projectDescriptionConfig } from "app/projects/schema";
import { BlogCard } from "components/cards";
import { ClientRender } from "components/client-render";
import EventCard from "components/dashboard/event-card";
import { CardRow, Layout, Section, SectionContent } from "components/layout";
import ProjectCard from "components/project/card";
import * as S from "components/project/styles";
import { Projects } from "components/sections";
import OpportunityItem from "components/sections/opportunity-overview";
import { Heading1, Heading2 } from "components/typography";
import {
  PortalEvent,
  compareEventsByTime,
  isEventPast,
} from "lib/airtable/event";
import { PortalOpportunity } from "lib/airtable/opportunity";
import { PortalProject } from "lib/airtable/project";
import { TeamEngagement } from "lib/airtable/team-engagement";
import { Article } from "lib/data-sources/blog";
import { YTPlaylistItem, getAllVideos } from "lib/data-sources/youtube";
import { Route } from "lib/routing";
import { siteData } from "lib/site-data";
import { doNotTranslate, getResizedImgUrl } from "lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";

interface PageProps {
  project: PortalProject;
  otherProjects: readonly PortalProject[];
  coordinators: readonly TeamEngagement[];
  opportunities: readonly PortalOpportunity[];
  relatedBlogPosts: readonly Article[];
  relatedEvents: readonly PortalEvent[];
  relatedVideos: readonly YTPlaylistItem[];
}

interface QueryParams extends ParsedUrlQuery {
  slug: string;
}

const ProjectPage = (props: PageProps) => {
  const { project } = props;
  const { status: sessionStatus } = useSession();
  return (
    <Layout
      crumbs={[
        {
          path: Route.projects,
          label: "Projekty",
        },
        { label: project.name },
      ]}
      head={{
        title: project.name,
        description: project.tagline,
        coverUrl: project.coverImageUrl,
      }}
    >
      <IntroSection project={project} />
      <AboutSection project={project} coordinators={props.coordinators} />
      {props.opportunities.length > 0 && (
        <OpportunitiesSection opportunities={props.opportunities} />
      )}
      {props.relatedEvents.some((e) => !isEventPast(e)) && (
        <EventsSection project={project} relatedEvents={props.relatedEvents} />
      )}
      {props.relatedVideos.length > 0 && (
        <VideosSection relatedVideos={props.relatedVideos} />
      )}
      {props.relatedBlogPosts.length > 0 && (
        <BlogSection relatedBlogPosts={props.relatedBlogPosts} />
      )}
      {sessionStatus === "unauthenticated" && <JoinUsBox />}
      <FooterSection otherProjects={props.otherProjects} />
    </Layout>
  );
};

//
// About Section
//

const AboutSection = ({
  project,
  coordinators,
}: Pick<PageProps, "project" | "coordinators">) => {
  // TODO: Log validation errors somewhere
  const syntaxTree = Markdoc.parse(project.description.source);
  const renderableNode = Markdoc.transform(
    syntaxTree,
    projectDescriptionConfig
  );
  const renderedContent = Markdoc.renderers.react(renderableNode, React, {
    components: allCustomTags,
  });
  return (
    <Section>
      <SectionContent>
        <S.AboutSectionWrapper>
          <S.DescriptionWrapper>
            <Heading2>O projektu</Heading2>
            <div className="text-xl leading-relaxed">{renderedContent}</div>
          </S.DescriptionWrapper>
          <S.ProjectCardWrapper>
            <ProjectCard project={project} coordinators={coordinators} />
          </S.ProjectCardWrapper>
        </S.AboutSectionWrapper>
      </SectionContent>
    </Section>
  );
};

//
// Other Sections
//

const IntroSection = ({ project }: Pick<PageProps, "project">) => (
  <Section>
    <SectionContent>
      <Heading1 className={doNotTranslate}>{project.name}</Heading1>
      <S.Tagline>{project.tagline}</S.Tagline>
      <S.CoverImageWrapper>
        <S.CoverImage
          src={getResizedImgUrl(project.coverImageUrl, 1160)}
          loading="lazy"
        />
      </S.CoverImageWrapper>
    </SectionContent>
  </Section>
);

const OpportunitiesSection = ({
  opportunities,
}: Pick<PageProps, "opportunities">) => (
  <Section id="opportunities">
    <SectionContent>
      <S.TitleRow>
        <S.Title>Právě hledáme</S.Title>
        <S.AccessoryLink to={Route.opportunities}>
          Všechny příležitosti
        </S.AccessoryLink>
      </S.TitleRow>
      <S.RelatedContentWrapper>
        {opportunities.map((op) => (
          <OpportunityItem key={op.id} opportunity={op} />
        ))}
      </S.RelatedContentWrapper>
    </SectionContent>
  </Section>
);

const EventsSection = ({
  relatedEvents,
  project,
}: Pick<PageProps, "relatedEvents" | "project">) => (
  <Section>
    <SectionContent>
      <S.TitleRow>
        <S.Title>Vybrané akce</S.Title>
        <S.AccessoryLink to={Route.events}>Všechny akce</S.AccessoryLink>
      </S.TitleRow>
      <S.CardRowWrapper>
        <CardRow>
          {relatedEvents.map((event) => (
            <EventCard key={event.id} event={event} project={project} />
          ))}
        </CardRow>
      </S.CardRowWrapper>
    </SectionContent>
  </Section>
);

const VideosSection = ({ relatedVideos }: Pick<PageProps, "relatedVideos">) => (
  // TBD: This is only rendered on the client as the YouTube embed breaks hydration
  <ClientRender>
    <Section>
      <SectionContent>
        <S.TitleRow>
          <S.Title>Vybraná videa</S.Title>
          <S.AccessoryLink to={Route.youtube}>Všechna videa</S.AccessoryLink>
        </S.TitleRow>
        <S.CardRowWrapper>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mx-[20px] md:mx-0">
            {relatedVideos.slice(0, 6).map((video) => (
              <LiteYouTubeEmbed
                key={video.id}
                id={video.snippet.resourceId.videoId}
                title={video.snippet.title}
                poster="hqdefault"
                noCookie={true}
              />
            ))}
          </div>
        </S.CardRowWrapper>
      </SectionContent>
    </Section>
  </ClientRender>
);

const BlogSection = ({
  relatedBlogPosts,
}: Pick<PageProps, "relatedBlogPosts">) => (
  <Section>
    <SectionContent>
      <S.TitleRow>
        <S.Title>Vybíráme z našeho blogu</S.Title>
        <S.AccessoryLink to={Route.blog}>Blog Česko.Digital</S.AccessoryLink>
      </S.TitleRow>
      <S.CardRowWrapper>
        <CardRow>
          {relatedBlogPosts.map((post) => (
            <BlogCard
              key={post.url}
              link={post.url}
              title={post.title}
              cover={post.cover}
            />
          ))}
        </CardRow>
      </S.CardRowWrapper>
    </SectionContent>
  </Section>
);

const FooterSection = ({ otherProjects }: Pick<PageProps, "otherProjects">) => (
  <Section>
    <SectionContent>
      <Projects title="Další projekty" projects={otherProjects} />
    </SectionContent>
  </Section>
);

//
// Data Loading
//

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const paths = siteData.projects
    .filter((p) => p.state !== "draft")
    .map((project) => ({
      params: { slug: project.slug },
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
  const { projects, teamEngagements, events } = siteData;
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return { notFound: true };
  }
  const coordinators = project.teamEngagementIds
    .map((id) => teamEngagements.find((e) => e.id === id)!)
    .filter((e) => e !== undefined)
    .filter((e) => e.coordinatingRole);
  const opportunities = siteData.opportunities.filter(
    (o) => o.projectId === project.id && o.status === "live"
  );
  const relatedBlogPosts = siteData.blogPosts
    .filter((post) => post.tags.some((tag) => tag === project.slug))
    .slice(0, 6);
  const otherProjects = projects
    .filter((p) => p != project && p.state === "running")
    .slice(0, 3);
  const relatedEvents = events
    .filter((e) => e.projectId === project.id)
    .filter((e) => e.published)
    .sort(compareEventsByTime)
    .reverse()
    .slice(0, 3);
  const youtubeApiKey = process.env.YOUTUBE_API_KEY;
  const relatedVideos =
    youtubeApiKey && project.youTubePlaylistId
      ? await getAllVideos(youtubeApiKey, project.youTubePlaylistId)
      : [];
  return {
    props: {
      project,
      otherProjects,
      coordinators,
      relatedBlogPosts,
      opportunities,
      relatedEvents,
      relatedVideos,
    },
    // Regenerate every five minutes to refresh project info
    revalidate: 60 * 5,
  };
};

export default ProjectPage;
