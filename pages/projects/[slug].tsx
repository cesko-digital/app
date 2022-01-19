import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { Layout, Section, SectionContent } from "components/layout";
import { Heading1 } from "components/typography";
import AboutProject from "components/project/about";
import ProjectCard from "components/project/card";
import Contribute from "components/project/contribute";
import { Projects } from "components/sections";
import { getResizedImgUrl } from "lib/utils";
import { PortalOpportunity, PortalProject, PortalUser } from "lib/portal-types";
import * as S from "components/project/styles";
import { OpportunitiesMainWrapper } from "components/portal-dobrovolnika/styles";
import strings from "content/strings.json";
import { ParsedUrlQuery } from "querystring";
import { siteData } from "lib/site-data";
import OpportunityItem from "components/sections/opportunity-overview";
import { Route } from "lib/routing";

interface PageProps {
  project: PortalProject;
  coordinators: readonly PortalUser[];
  projects: readonly PortalProject[];
  opportunities: readonly PortalOpportunity[];
}

interface QueryParams extends ParsedUrlQuery {
  slug: string;
}

const ProjectPage: NextPage<PageProps> = (props) => {
  const { project, coordinators, projects, opportunities } = props;
  const otherProjects = projects.filter((p) => p != project).slice(0, 3);
  return (
    <Layout
      crumbs={[
        {
          path: "/projekty",
          label: strings.pages.projects.navigation.projects,
        },
        { label: project.name },
      ]}
      seo={{
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
              <AboutProject
                finished={project.state === "finished"}
                thankYouText={project.contributeText} // Using same field when project finished
                description={project.description}
              />
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
              <S.Title>{strings.pages.project.opportunities.title}</S.Title>
              <S.AccessoryLink to={Route.opportunities}>
                {strings.pages.project.opportunities.seeAll}
              </S.AccessoryLink>
            </S.TitleRow>
            <OpportunitiesMainWrapper>
              {opportunities.map((op) => (
                <OpportunityItem key={op.id} opportunity={op} />
              ))}
            </OpportunitiesMainWrapper>
          </SectionContent>
        </Section>
      )}

      {project.state !== "finished" && project.contributeText && (
        <Section>
          <SectionContent>
            <S.ContributeWrapper>
              <Contribute text={project.contributeText} />
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
  const { projects, users } = siteData;
  const project = projects.find((p) => p.slug === slug)!;
  const coordinators = project.coordinatorIds.map(
    (id) => users.find((user) => user.id === id)!
  );
  const opportunities = siteData.opportunities.filter(
    (o) => o.projectId === project.id && o.status === "live"
  );
  return {
    props: {
      project,
      projects,
      coordinators,
      opportunities,
    },
  };
};

export default ProjectPage;
