import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { PortalOpportunity, PortalProject, PortalUser } from "lib/portal-types";
import { prepareToSerialize } from "lib/utils";
import { Layout, Section, SectionContent } from "components/layout";
import { Heading1, BodySmall, Body } from "components/typography";
import * as S from "components/portal-dobrovolnika/opportunity/styles";
import {
  OwnerName,
  OpportunityMetaRow,
} from "components/portal-dobrovolnika/opportunity/styles";
import TimeIcon from "components/icons/time";
import OpportunityItem from "components/sections/opportunity-overview";
import { OpportunitiesMainWrapper } from "components/portal-dobrovolnika/styles";
import { getResizedImgUrl } from "lib/utils";
import RenderMarkdown from "components/markdown";
import { Route } from "lib/routing";
import { ParsedUrlQuery } from "querystring";
import { appState } from "lib/app-state";

interface PageProps {
  opportunity: PortalOpportunity;
  opportunities: PortalOpportunity[];
  users: PortalUser[];
  projects: PortalProject[];
}

interface QueryParams extends ParsedUrlQuery {
  slug: string;
}

const Page: NextPage<PageProps> = (props) => {
  const { opportunity, opportunities, users, projects } = props;
  const opportunityProject = (o: PortalOpportunity) =>
    projects.find((p) => p.id === o.projectId)!;
  const opportunityOwner = (o: PortalOpportunity) =>
    users.find((u) => u.id === o.ownerId)!;
  const parentProject = opportunityProject(opportunity);
  const owner = opportunityOwner(opportunity);
  const coverImageUrl =
    opportunity.coverImageUrl || parentProject.coverImageUrl;
  return (
    <Layout
      crumbs={[
        { path: "/portal-dobrovolnika", label: "Portál dobrovolníka" },
        { path: "/opportunities", label: "Volné pozice" },
        { label: opportunity.name },
      ]}
      seo={{
        title: opportunity.name,
        description: opportunity.summary.source, // TODO: We should have a plain text summary and a Markdown description
        coverUrl: coverImageUrl,
      }}
    >
      <Section>
        <SectionContent>
          <Heading1>{opportunity.name}</Heading1>
          <S.CoverImageWrapper>
            <S.CoverImage
              src={getResizedImgUrl(coverImageUrl, 1160)}
              loading="lazy"
            />
          </S.CoverImageWrapper>
          <S.OpportunityHeader>
            <S.OpportunityDescription>
              <Body>
                <RenderMarkdown source={opportunity.summary} />
              </Body>
            </S.OpportunityDescription>
            <S.OpportunityContactCard>
              <S.OpportunityMetaRow>
                <S.OpportunityProjectImg src={parentProject.logoUrl} />
                {parentProject.silent && <Body>{parentProject.name}</Body>}
                {!parentProject.silent && (
                  <a href={Route.toProject(parentProject)}>
                    <Body>{parentProject.name}</Body>
                  </a>
                )}
              </S.OpportunityMetaRow>
              <OpportunityMetaRow>
                <TimeIcon />
                <Body>{opportunity.timeRequirements}</Body>
              </OpportunityMetaRow>
              <S.OpportunityOwnerWrapper>
                <Body>Kontaktní osoba</Body>
                <S.OwnerWrapper>
                  <S.OwnerImage src={owner.profilePictureUrl} />
                  <div>
                    <OwnerName>{owner.name}</OwnerName>
                    <BodySmall>{parentProject.name}</BodySmall>
                  </div>
                </S.OwnerWrapper>
              </S.OpportunityOwnerWrapper>
              <a href={opportunity.contactUrl} target="blank">
                <S.OpportunitySlackButton>
                  Kontaktovat přes Slack
                </S.OpportunitySlackButton>
              </a>
            </S.OpportunityContactCard>
          </S.OpportunityHeader>
        </SectionContent>
      </Section>
      <Section>
        <SectionContent>
          <OpportunitiesMainWrapper>
            {opportunities.slice(0, 3).map((o) => (
              <OpportunityItem
                key={o.id}
                opportunity={o}
                relatedProject={opportunityProject(o)}
              />
            ))}
          </OpportunitiesMainWrapper>
        </SectionContent>
      </Section>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const paths = appState.opportunities.map((opportunity) => ({
    params: { slug: opportunity.slug },
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
  const { opportunities, projects, users } = appState;
  const opportunity = opportunities.find((o) => o.slug === slug)!;
  return {
    props: prepareToSerialize({
      opportunity,
      opportunities: opportunities.filter((o) => o.status === "live"),
      projects,
      users,
    }),
  };
};

export default Page;
