import { PortalProject } from "lib/portal-types";
import { Layout, Section, SectionContent } from "components/layout";
import { JoinUs } from "components/sections";
import HighlightedProject from "components/projects/highlighted";
import ProjectList from "components/projects/card-list";
import * as S from "components/projects/index-styles";
import strings from "content/strings.json";

export type PageProps = {
  projects: PortalProject[];
};

export const ProjectOverviewPage: React.FC<PageProps> = ({ projects }) => {
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
