import ProjectList from "app/projects/card-list";
import HighlightedProject from "app/projects/highlighted";
import { Layout, Section, SectionContent } from "components/layout";
import { JoinUs } from "components/sections";
import { BodyBig, Heading1, Heading2 } from "components/typography";
import { PortalProject } from "lib/airtable/project";
import { Route } from "lib/routing";
import Link from "next/link";
import styled from "styled-components";

export type Props = {
  projects: PortalProject[];
};

export const Page = ({ projects }: Props) => {
  const highlightedProject = projects.find((p) => p.highlighted);
  const otherRunningProjects = projects.filter(
    (p) =>
      p != highlightedProject &&
      (p.state === "running" || p.state === "incubating")
  );
  const finishedProjects = projects.filter((p) => p.state === "finished");
  return (
    <Layout
      crumbs={[{ label: "Co děláme" }]}
      head={{
        title: "Co děláme",
        description:
          "Díky expertnímu dobrovolnictví dokážeme dosáhnout velkých věcí a měnit život v Česku k lepšímu. Podívejte se, jak to děláme.",
      }}
    >
      <Section>
        <SectionContent>
          <Wrapper>
            <Heading>Projekty</Heading>
            <Tagline>
              Díky expertnímu dobrovolnictví dokážeme dosáhnout velkých věcí a
              měnit život v Česku k lepšímu. Prohlédněte si naše projekty a
              pokud vás zaujmou, podívejte se na{" "}
              <Link href={Route.opportunities}>
                aktuální příležitosti k zapojení
              </Link>
              .
            </Tagline>
          </Wrapper>
        </SectionContent>
      </Section>

      <Section>
        <SectionContent>
          <ProjectsHeading>Aktuální projekty</ProjectsHeading>
          {highlightedProject && (
            <HighlightedProject project={highlightedProject} />
          )}
          <ProjectList projects={otherRunningProjects} />
        </SectionContent>
      </Section>

      <Section>
        <SectionContent>
          <ProjectsHeading>Dokončené projekty</ProjectsHeading>
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

//
// Styles
//

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  overflow-wrap: break-word;
`;

const Heading = styled(Heading1)`
  margin: 50px 0 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 38px;
  }
`;

const Tagline = styled(BodyBig)`
  margin-bottom: 100px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 26px;
  }
`;

const ProjectsHeading = styled(Heading2)`
  margin-bottom: 30px;
  margin-top: 30px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 17px;
  }
`;
