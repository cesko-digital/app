import type { NextPage, GetStaticProps } from "next";
import { PortalOpportunity, PortalProject } from "lib/portal-types";
import { Layout, SectionContent, Section } from "components/layout";
import * as Typography from "components/typography";
import OpportunityItem from "components/sections/opportunity-overview";
import styled from "styled-components";
import {
  CompetencyFilterLabel,
  CompetencyFilterRadio,
} from "components/dashboard/styles";
import { Route } from "lib/utils";
import { useState } from "react";
import { siteData } from "lib/site-data";
import strings from "content/strings.json";
import Select from "components/select";

type PageProps = {
  opportunities: readonly PortalOpportunity[];
  projects: readonly PortalProject[];
  selectedSkill?: string;
};

const Page: NextPage<PageProps> = (props) => {
  const { opportunities, projects } = props;

  const allSkills = getSkills();
  let filteredOpportunities: PortalOpportunity[] = [];

  const [selectedSkill, updateSelectedSkill] = useState(
    props.selectedSkill || strings.pages.opportunities.all
  );

  const projectForOpportunity = (o: PortalOpportunity) =>
    projects.find((p) => o.projectId === p.id)!;

  function handleSkillSelectionChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newSelectedSkill = e.target.value;
    updateSelectedSkill(newSelectedSkill);
  }

  function filterOpportunities() {
    if (selectedSkill === strings.pages.opportunities.all) {
      filteredOpportunities = [...opportunities];
    } else {
      filteredOpportunities = [];
      opportunities.forEach((r) => {
        r.skills.some((rs) => {
          if (rs === selectedSkill) {
            filteredOpportunities.push(r);
          }
        });
      });
    }
  }

  function getSkills() {
    let toReturn: { name: string; count: number }[] = [];
    opportunities.forEach((r) => {
      r.skills &&
        r.skills.forEach((s) => {
          if (!toReturn.find((t) => t.name === s))
            toReturn.push({ name: s, count: 0 });
          const skill: { name: string; count: number } | undefined =
            toReturn.find((t) => t.name === s);
          if (skill) skill.count++;
        });
    });

    // Add strings.pages.opportunities.all
    toReturn.push({
      name: strings.pages.opportunities.all,
      count: opportunities.length,
    });

    // We sort; strings.pages.opportunities.all goes to the beginning
    toReturn = toReturn.sort((a, b) => {
      if (a.name === strings.pages.opportunities.all) return -1;
      else if (b.name === strings.pages.opportunities.all) return 1;
      else if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      else return 0;
    });

    return toReturn;
  }

  const selectChangeHandler = (e: any) => {
    updateSelectedSkill(e.value);
    const target: HTMLInputElement | null = document.querySelector(
      `input[value="${e.value}"]`
    );
    if (target) target.checked = true;
  };

  filterOpportunities();

  return (
    <Layout
      crumbs={[
        { label: strings.crumbs.dashboard, path: Route.dashboard },
        { label: strings.pages.opportunities.opportunities },
      ]}
      head={{
        title:
          strings.pages.opportunities.opportunities +
          " - " +
          strings.crumbs.dashboard,
        description:
          strings.pages.opportunities.opportunities +
          " - " +
          strings.crumbs.dashboard,
      }}
    >
      <Section>
        <SectionContent>
          <Typography.Heading1>
            Volné pozice{" "}
            <OpportunitiesCountSpan>
              {opportunities.length}
            </OpportunitiesCountSpan>
          </Typography.Heading1>
        </SectionContent>
      </Section>
      <Section>
        <SectionContent>
          <FiltersDesktop>
            {allSkills.map((s) => [
              <CompetencyFilterRadio
                key={"competencyInput" + s.name}
                type="radio"
                defaultChecked={s.name === selectedSkill}
                value={s.name}
                name="competencyInputRadio"
                onChange={handleSkillSelectionChange}
              />,
              <CompetencyFilterLabel
                key={"competencyLabel" + s.name}
                onClick={() => {
                  const target: HTMLInputElement | null =
                    document.querySelector('input[value="' + s.name + '"]');
                  if (target) target.click();
                }}
              >
                {s.name + " (" + s.count + ")"}
              </CompetencyFilterLabel>,
            ])}
          </FiltersDesktop>
          <FiltersMobile>
            <Select
              allSkills={allSkills}
              selectedSkill={selectedSkill}
              onChange={selectChangeHandler}
            />
          </FiltersMobile>
        </SectionContent>
      </Section>
      <Section>
        <SectionContent>
          {filteredOpportunities.map((r) => (
            <OpportunityItem
              key={r.id}
              opportunity={r}
              relatedProject={projectForOpportunity(r)}
            />
          ))}
        </SectionContent>
      </Section>
    </Layout>
  );
};

const OpportunitiesCountSpan = styled.span`
  color: gray;
`;

const FiltersDesktop = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const FiltersMobile = styled.div`
  display: none;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: unset;
  }
`;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const { opportunities, projects } = siteData;
  return {
    props: {
      opportunities: opportunities.filter((o) => o.status === "live"),
      projects,
    },
  };
};

export default Page;
