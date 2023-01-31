import type { NextPage, GetStaticProps } from "next";
import { Layout, Section, SectionContent } from "components/layout";
import { JoinUs } from "components/sections";
import * as S from "components/project/index-styles";
import strings from "content/strings.json";
import { siteData } from "lib/site-data";
import HighlightedProject from "components/project/highlighted";
import ProjectList from "components/project/card-list";
import { PortalProject } from "lib/airtable/project";
import { Route } from "lib/utils";
import Link from "next/link";

type PageProps = {
  projects: PortalProject[];
};

const Page: NextPage<PageProps> = ({ projects }) => {
  const msg = strings.pages.projects;
  const highlightedProject = projects.find((p) => p.highlighted);
  const otherRunningProjects = projects.filter(
    (p) =>
      p != highlightedProject &&
      (p.state === "running" || p.state === "incubating")
  );
  const finishedProjects = projects.filter((p) => p.state === "finished");
  return (
    <Layout
      crumbs={[{ label: msg.navigation.projects }]}
      head={{
        title: msg.metadata.title,
        description: msg.metadata.description,
      }}
    >
      <Section>
        <SectionContent>
          <S.Wrapper>
            <S.Heading>{msg.title}</S.Heading>
            <S.Tagline>
              Díky expertnímu dobrovolnictví dokážeme dosáhnout velkých věcí a
              měnit život v Česku k lepšímu. Podívejte se, jak to děláme. Chcete
              pomáhat s námi? Podívejte se na{" "}
              <Link href={Route.opportunities}>
                <a>aktuální příležitosti k zapojení</a>
              </Link>
              .
            </S.Tagline>
          </S.Wrapper>
        </SectionContent>
      </Section>

      <Section>
        <SectionContent>
          <S.ProjectsHeading>{msg.ongoing}</S.ProjectsHeading>
          {highlightedProject && (
            <HighlightedProject project={highlightedProject} />
          )}
          <ProjectList projects={otherRunningProjects} />
        </SectionContent>
      </Section>

      <Section>
        <SectionContent>
          <S.ProjectsHeading>{msg.finished}</S.ProjectsHeading>
          <ProjectList projects={finishedProjects} />
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

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const projects = siteData.projects.filter(
    (p) => p.state !== "draft" && p.state !== "internal"
  );
  return {
    props: { projects },
    // Regenerate every five minutes to refresh project info
    revalidate: 60 * 5,
  };
};

export default Page;
