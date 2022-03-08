import type { NextPage, GetStaticProps } from "next";
import { Layout, SectionContent, Section } from "components/layout";
import * as Typography from "components/typography";
import * as S from "components/dashboard/styles";
import EventCard from "components/dashboard/event-card";
import OpportunityItem from "components/sections/opportunity-overview";
import { Button } from "components/shared/buttons";
import { CardRow } from "components/layout";
import { Route } from "lib/routing";
import CeduCard from "components/dashboard/cedu-card";
import { PortalVideo } from "lib/cedu";
import {
  PortalEvent,
  PortalOpportunity,
  PortalProject,
} from "lib/portal-types";
import { siteData } from "lib/site-data";
import { compareEventsByTime, isEventPast } from "lib/portal-type-utils";
import strings from "content/strings.json";
import Link from "next/link";

interface PageProps {
  opportunities: readonly PortalOpportunity[];
  upcomingEvents: readonly PortalEvent[];
  projects: readonly PortalProject[];
  videos: readonly PortalVideo[];
}

const Dashboard: NextPage<PageProps> = (props) => {
  return (
    <Layout
      crumbs={[{ label: strings.crumbs.dashboard }]}
      head={{
        title: strings.crumbs.dashboard,
        description: strings.header.dashboardDescription,
        coverUrl: "https://data.cesko.digital/img/bcbb8e4a.png",
      }}
    >
      <Section>
        <SectionContent>
          <Typography.Heading1>{strings.header.dashboard}</Typography.Heading1>
          <Typography.Body>
            {strings.header.dashboardDescription}
          </Typography.Body>
        </SectionContent>
      </Section>
      <OpportunitiesSection {...props} />
      {props.upcomingEvents.length > 0 && <EventsSection {...props} />}
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
        <Typography.Heading2>
          {strings.pages.dashboard.currentOpportunities}
        </Typography.Heading2>
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
          <Link href={Route.opportunities}>
            <a>
              <Button>{strings.pages.dashboard.moreOpportunities}</Button>
            </a>
          </Link>
        </S.ButtonWrapper>
      </SectionContent>
    </Section>
  );
};

const EventsSection: React.FC<PageProps> = ({ upcomingEvents, projects }) => {
  const eventProject = (e: PortalEvent) =>
    projects.find((p) => p.id === e.projectId)!;
  return (
    <Section id="section-events">
      <SectionContent>
        <S.CategoryHeader>
          <S.Title>{strings.pages.dashboard.comingEvents}</S.Title>
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
          <S.Title>{strings.pages.dashboard.cedu}</S.Title>
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
  const upcomingEvents = [...events]
    .filter((e) => e.status === "live")
    .filter((e) => !isEventPast(e))
    .sort(compareEventsByTime)
    .slice(0, 6);
  return {
    props: {
      upcomingEvents,
      opportunities,
      videos,
      projects,
    },
  };
};

export default Dashboard;
