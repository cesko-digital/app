import { Article } from "lib/related-blog-posts";
import { CardRow, Layout, Section, SectionContent } from "components/layout";
import { Heading1 } from "components/typography";
import AboutProject from "components/projects/about";
import ProjectCard from "components/projects/card";
import ContributeBox from "components/projects/contribute";
import { Projects } from "components/sections";
import { getResizedImgUrl } from "lib/utils";
import * as S from "components/projects/styles";
import strings from "content/strings.json";
import OpportunityItem from "components/sections/opportunity-overview";
import { Route } from "lib/routing";
import { BlogCard } from "components/cards";
import EventCard from "components/dashboard/event-card";
import { isEventPast } from "lib/portal-type-utils";
import {
  PortalEvent,
  PortalOpportunity,
  PortalProject,
  PortalUser,
} from "lib/portal-types";

export type PageProps = {
  project: PortalProject;
  otherProjects: readonly PortalProject[];
  coordinators: readonly PortalUser[];
  opportunities: readonly PortalOpportunity[];
  relatedBlogPosts: readonly Article[];
  relatedEvents: readonly PortalEvent[];
};

export const ProjectPage: React.FC<PageProps> = (props) => {
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
        <Section>
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
                  <BlogCard key={post.url} link={post.url} {...post} />
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
