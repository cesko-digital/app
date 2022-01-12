import type { NextPage, GetStaticProps } from "next";
import { PortalProject } from "lib/portal-types";
import { Layout, Section, SectionContent } from "components/layout";
import { JoinUs } from "components/sections";
import * as S from "components/project/index-styles";
import { prepareToSerialize } from "lib/utils";
import strings from "content/strings.json";
import { siteData } from "lib/site-data";
import HighlightedProject from "components/project/highlighted";
import ProjectList from "components/project/card-list";

type PageProps = {
  projects: PortalProject[];
};

const Page: NextPage<PageProps> = ({ projects }) => {
  const msg = strings.pages.projects;
  const highlightedProject = projects.find((p) => p.highlighted);
  const otherProjects = projects.filter((p) => p != highlightedProject);
  return (
    <Layout
      crumbs={[{ label: msg.navigation.projects }]}
      seo={{
        title: msg.metadata.title,
        description: msg.metadata.description,
      }}
    >
      <Section>
        <SectionContent>
          <S.Wrapper>
            <S.Heading>{msg.title}</S.Heading>
            <S.Tagline>{msg.description}</S.Tagline>
          </S.Wrapper>
        </SectionContent>
      </Section>
      <Section>
        <SectionContent>
          <S.ProjectsHeading>{msg.ongoing}</S.ProjectsHeading>
          {highlightedProject && (
            <HighlightedProject project={highlightedProject} />
          )}
          <ProjectList projects={otherProjects} />
        </SectionContent>
      </Section>

      <Section>
        <SectionContent>
          <JoinUs />
        </SectionContent>
      </Section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const projects = siteData.projects.filter((p) => !p.draft && !p.silent);
  return {
    props: prepareToSerialize({
      projects,
    }),
  };
};

export default Page;
