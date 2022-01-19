import type { NextPage, GetStaticProps } from "next";
import { Layout, SectionContent, Section } from "components/layout";
import * as Typography from "components/typography";
import * as S from "components/portal-dobrovolnika/styles";
import EventCard from "components/portal-dobrovolnika/event-card";
import OpportunityItem from "components/sections/opportunity-overview";
import { Button } from "components/buttons";
import { CardRow } from "components/layout";
import { Route } from "lib/routing";
import CeduCard from "components/portal-dobrovolnika/cedu-card";
import { PortalVideo } from "lib/cedu";
import {
  PortalEvent,
  PortalOpportunity,
  PortalProject,
} from "lib/portal-types";
import { siteData } from "lib/site-data";
import { compareEventsByTime, isEventPast } from "lib/portal-type-utils";

interface PageProps {
  opportunities: readonly PortalOpportunity[];
  events: readonly PortalEvent[];
  projects: readonly PortalProject[];
  videos: readonly PortalVideo[];
}

const PortalDobrovolnika: NextPage<PageProps> = (props) => {
  return (
    <Layout
      crumbs={[{ label: "Portál dobrovolníka" }]}
      seo={{
        title: "Portál dobrovolníka",
        description: "Tržiště příležitostí, jak se zapojit v Česko.Digital",
        coverUrl: "https://data.cesko.digital/img/bcbb8e4a.png",
      }}
    >
      <Section>
        <SectionContent>
          <Typography.Heading1>Portál dobrovolníka</Typography.Heading1>
          <Typography.Body>
            Tržiště příležitostí, jak se zapojit v Česko.Digital
          </Typography.Body>
        </SectionContent>
      </Section>
      <OpportunitiesSection {...props} />
      <EventsSection {...props} />
      <CeduSection {...props} />
    </Layout>
  );
};

const OpportunitiesSection: React.FC<PageProps> = ({
  opportunities,
  projects,
}) => {
  const opportunityProject = (o: PortalOpportunity) =>
    projects.find((p) => p.id === o.projectId)!;
  // How should we sort this? How about a random sort?
  const featuredOpportunities = opportunities.slice(0, 3);
  return (
    <Section>
      <SectionContent>
        <Typography.Heading2>Právě hledáme</Typography.Heading2>
        <S.OpportunitiesMainWrapper>
          {featuredOpportunities.map((op) => (
            <OpportunityItem
              key={op.id}
              opportunity={op}
              relatedProject={opportunityProject(op)}
            />
          ))}
        </S.OpportunitiesMainWrapper>
        <S.ButtonWrapper>
          <a href={Route.opportunities}>
            <Button>Více volných pozic</Button>
          </a>
        </S.ButtonWrapper>
      </SectionContent>
    </Section>
  );
};

const EventsSection: React.FC<PageProps> = ({ events, projects }) => {
  const upcomingEvents = [...events]
    .filter((e) => e.status === "live")
    .filter((e) => !isEventPast(e))
    .sort(compareEventsByTime)
    .slice(0, 6);
  const eventProject = (e: PortalEvent) =>
    projects.find((p) => p.id === e.projectId)!;
  return (
    <Section id="section-events">
      <SectionContent>
        <S.CategoryHeader>
          <S.Title>Nejbližší akce</S.Title>
        </S.CategoryHeader>
        <S.Container>
          <S.CardWrapper>
            <CardRow>
              {upcomingEvents.map((event, index) => (
                <EventCard
                  key={index}
                  event={event}
                  project={eventProject(event)}
                />
              ))}
            </CardRow>
          </S.CardWrapper>
        </S.Container>
      </SectionContent>
    </Section>
  );
};

const CeduSection: React.FC<PageProps> = ({ videos }) => {
  return (
    <Section id="section-cedu">
      <SectionContent>
        <S.CategoryHeader>
          <S.Title>Vzdělávání – č.edu</S.Title>
        </S.CategoryHeader>
        <S.Container>
          <S.CardWrapper>
            <CardRow>
              {videos.map((video, index) => (
                <CeduCard key={index} video={video} />
              ))}
            </CardRow>
          </S.CardWrapper>
        </S.Container>
      </SectionContent>
    </Section>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const { projects, events, opportunities, videos } = siteData;
  return {
    props: {
      events,
      opportunities,
      videos,
      projects,
    },
  };
};

export default PortalDobrovolnika;
