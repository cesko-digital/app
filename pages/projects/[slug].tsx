import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { CardRow, Layout, Section, SectionContent } from "components/layout";
import { Heading1 } from "components/typography";
import AboutProject from "components/project/about";
import ProjectCard from "components/project/card";
import ContributeBox from "components/project/contribute";
import { Projects } from "components/sections";
import { getResizedImgUrl } from "lib/utils";
import * as S from "components/project/styles";
import strings from "content/strings.json";
import { ParsedUrlQuery } from "querystring";
import { siteData } from "lib/site-data";
import OpportunityItem from "components/sections/opportunity-overview";
import { Route } from "lib/utils";
import { Article } from "lib/related-blog-posts";
import { BlogCard } from "components/cards";
import EventCard from "components/dashboard/event-card";
import { PortalUser } from "lib/airtable/user";
import { PortalOpportunity } from "lib/portal-types";
import { PortalProject } from "lib/airtable/project";
import {
  compareEventsByTime,
  isEventPast,
  PortalEvent,
} from "lib/airtable/event";

interface PageProps {
  project: PortalProject;
  otherProjects: readonly PortalProject[];
  coordinators: readonly PortalUser[];
  opportunities: readonly PortalOpportunity[];
  relatedBlogPosts: readonly Article[];
  relatedEvents: readonly PortalEvent[];
}

interface QueryParams extends ParsedUrlQuery {
  slug: string;
}

const ProjectPage: NextPage<PageProps> = (props) => {
  const {
    project,
    coordinators,
    otherProjects,
    opportunities,
    relatedBlogPosts,
    relatedEvents,
  } = props;
  const msg = strings.pages.project;
  return (
    <Layout
      crumbs={[
        {
          path: Route.projects,
          label: strings.pages.projects.navigation.projects,
        },
        { label: project.name },
      ]}
      head={{
        title: project.name,
        description: project.tagline,
        coverUrl: project.coverImageUrl,
      }}
    >
      <Section>
        <SectionContent>
          <Heading1>{project.name}</Heading1>
          <S.Tagline>{project.tagline}</S.Tagline>
          <S.CoverImageWrapper>
            <S.CoverImage
              src={getResizedImgUrl(project.coverImageUrl, 1160)}
              loading="lazy"
            />
          </S.CoverImageWrapper>
        </SectionContent>
      </Section>

      <Section>
        <SectionContent>
          <S.AboutSectionWrapper>
            <S.DescriptionWrapper>
              <AboutProject text={project.description} />
            </S.DescriptionWrapper>
            <S.ProjectCardWrapper>
              <ProjectCard project={project} coordinators={coordinators} />
            </S.ProjectCardWrapper>
          </S.AboutSectionWrapper>
        </SectionContent>
      </Section>

      {opportunities.length > 0 && (
        <Section id="opportunities">
          <SectionContent>
            <S.TitleRow>
              <S.Title>{msg.opportunities.title}</S.Title>
              <S.AccessoryLink to={Route.opportunities}>
                {msg.opportunities.seeAll}
              </S.AccessoryLink>
            </S.TitleRow>
            <S.RelatedContentWrapper>
              {opportunities.map((op) => (
                <OpportunityItem key={op.id} opportunity={op} />
              ))}
            </S.RelatedContentWrapper>
          </SectionContent>
        </Section>
      )}

      {relatedEvents.some((e) => !isEventPast(e)) && (
        <Section>
          <SectionContent>
            <S.TitleRow>
              <S.Title>{msg.events.title}</S.Title>
              <S.AccessoryLink to={Route.events}>
                {msg.events.seeAll}
              </S.AccessoryLink>
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
      )}

      {relatedBlogPosts.length > 0 && (
        <Section>
          <SectionContent>
            <S.TitleRow>
              <S.Title>Vybíráme z našeho blogu</S.Title>
              <S.AccessoryLink to={Route.blog}>
                Blog Česko.Digital
              </S.AccessoryLink>
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
      )}

      {project.state !== "finished" && (
        <Section>
          <SectionContent>
            <S.ContributeWrapper>
              <ContributeBox />
            </S.ContributeWrapper>
          </SectionContent>
        </Section>
      )}

      <Section>
        <SectionContent>
          <Projects
            title={strings.components.sections.projects.otherProjects}
            projects={otherProjects}
          />
        </SectionContent>
      </Section>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const paths = siteData.projects
    .filter((p) => p.state !== "draft")
    .map((project) => ({
      params: { slug: project.slug },
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
  const project = projects.find((p) => p.slug === slug)!;
  const coordinators = project.coordinatorIds
    .map((id) => users.find((user) => user.id === id)!)
    .filter((c) => c !== undefined);
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
    .sort(compareEventsByTime)
    .reverse()
    .slice(0, 3);
  return {
    props: {
      project,
      otherProjects,
      coordinators,
      relatedBlogPosts,
      opportunities,
      relatedEvents,
    },
  };
};

export default ProjectPage;
