import type { NextPage, GetStaticProps } from "next";
import { Layout, SectionContent, Section } from "components/layout";
import * as Typography from "components/typography";
import * as S from "components/portal-dobrovolnika/styles";
import EventCard from "components/portal-dobrovolnika/event-card";
import OpportunityItem from "components/sections/opportunity-overview";
import { Button } from "components/buttons";
import { CardRow } from "components/layout";
import {
  PortalEvent,
  PortalOpportunity,
  PortalProject,
} from "lib/portal-types";
import {
  getAllEvents,
  getAllOpportunities,
  getAllProjects,
} from "lib/airtable-import";
import { prepareToSerialize } from "lib/utils";
import { Route } from "lib/routing";

interface PageProps {
  opportunities: PortalOpportunity[];
  events: PortalEvent[];
  allProjects: PortalProject[];
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
    </Layout>
  );
};

const OpportunitiesSection: React.FC<PageProps> = ({
  opportunities,
  allProjects,
}) => {
  const opportunityProject = (o: PortalOpportunity) =>
    allProjects.find((p) => p.id === o.projectId)!;
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

const EventsSection: React.FC<PageProps> = ({ events, allProjects }) => {
  const compareEventsByTime = (a: PortalEvent, b: PortalEvent) =>
    Date.parse(b.startTime) - Date.parse(a.startTime); /* TBD */
  const upcomingEvents = [...events]
    .filter((e) => e.status === "live")
    .sort(compareEventsByTime)
    .slice(0, 3);
  const eventProject = (e: PortalEvent) =>
    allProjects.find((p) => p.id === e.projectId)!;
  return (
    <Section id="section-events">
      <SectionContent>
        <S.CategoryHeader>
          <S.Title>Vybrané akce</S.Title>
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

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const apiKey = process.env.AIRTABLE_API_KEY as string;
  const events = await getAllEvents(apiKey);
  const opportunities = await getAllOpportunities(apiKey);
  const allProjects = await getAllProjects(apiKey);
  return {
    props: prepareToSerialize({
      events,
      opportunities,
      allProjects,
    }),
  };
};

export default PortalDobrovolnika;
