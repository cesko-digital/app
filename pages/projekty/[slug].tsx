import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { Layout, Section, SectionContent } from "components/layout";
import { Heading1 } from "components/typography";
import AboutProject from "components/project/about";
import ProjectCard from "components/project/project-card";
import Contribute from "components/project/contribute";
import { Projects } from "components/sections";
import { getResizedImgUrl } from "lib/utils";
import { getAllProjects, getAllUsers } from "lib/airtable-import";
import { PortalProject, PortalUser } from "lib/portal-types";
import * as S from "components/project/styles";
import strings from "content/strings.json";

type PageProps = {
  project: PortalProject;
  coordinators: PortalUser[];
  allProjects: PortalProject[];
};

const ProjectPage: NextPage<PageProps> = (props) => {
  const { project, coordinators, allProjects } = props;
  const otherProjects = allProjects.filter((p) => p != project).slice(0, 3);
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
                finished={project.finished}
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
      {!project.finished && project.contributeText && (
        <Section>
          <SectionContent>
            <S.ContributeWrapper>
              <Contribute contributeText={project.contributeText} />
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

// TODO: Can we type this tighter?
export const getStaticPaths: GetStaticPaths = async () => {
  const apiKey = process.env.AIRTABLE_API_KEY as string;
  const projects = await getAllProjects(apiKey);
  const paths = projects
    .filter((p) => !p.draft && !p.silent)
    .map((project) => ({
      params: { slug: project.slug },
    }));
  return {
    paths,
    fallback: false,
  };
};

// TODO: Can we type this tighter?
export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const apiKey = process.env.AIRTABLE_API_KEY as string;
  const allProjects = await getAllProjects(apiKey);
  const allUsers = await getAllUsers(apiKey);
  const project = allProjects.find((p) => p.slug === params!.slug)!;
  const coordinators = project.coordinatorIds.map(
    (id) => allUsers.find((user) => user.id === id)!
  );
  return {
    props: {
      allProjects,
      coordinators,
      project,
    },
    revalidate: 1,
  };
};

export default ProjectPage;
