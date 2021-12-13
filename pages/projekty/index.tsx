import type { NextPage, GetStaticProps } from "next";
import { getAllProjects } from "lib/airtable-import";
import { PortalProject } from "lib/portal-types";
import { Layout, Section, SectionContent } from "components/layout";
import {
  HighlightedProject,
  OngoingProjects,
} from "components/projects/sections";
import { JoinUs } from "components/sections";
import * as S from "components/projects/styles";
import { getResizedImgUrl } from "lib/utils";
import strings from "content/strings.json";

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
            <HighlightedProject
              cover={getResizedImgUrl(highlightedProject.coverImageUrl, 1160)}
              logo={highlightedProject.logoUrl}
              description={highlightedProject.tagline}
              title={highlightedProject.name}
              tags={[] /* TBD */}
              link={`/projekty/${highlightedProject.slug}`}
            />
          )}
          <OngoingProjects projects={otherProjects} />
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
  const apiKey = process.env.AIRTABLE_API_KEY as string;
  return {
    props: {
      projects: await getAllProjects(apiKey),
    },
  };
};

export default Page;
