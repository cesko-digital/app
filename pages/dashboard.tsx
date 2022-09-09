import type { NextPage, GetStaticProps } from "next";
import { Layout, SectionContent, Section } from "components/layout";
import * as Typography from "components/typography";
import * as S from "components/dashboard/styles";
import EventCard from "components/dashboard/event-card";
import OpportunityItem from "components/sections/opportunity-overview";
import { Button } from "components/buttons";
import { CardRow } from "components/layout";
import { Route, shuffled } from "lib/utils";
import { siteData } from "lib/site-data";
import strings from "content/strings.json";
import Link from "next/link";
import { getRandomElem, shuffleInPlace, unique } from "lib/utils";
import { PortalProject } from "lib/airtable/project";
import { PortalOpportunity } from "lib/airtable/opportunity";
import { YTPlaylistItem } from "lib/data-sources/youtube";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import {
  compareEventsByTime,
  isEventPast,
  PortalEvent,
} from "lib/airtable/event";

interface PageProps {
  opportunities: readonly PortalOpportunity[];
  upcomingEvents: readonly PortalEvent[];
  projects: readonly PortalProject[];
  videos: readonly YTPlaylistItem[];
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
      {props.videos.length > 0 && <EduSection {...props} />}
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
  return (
    <Section>
      <SectionContent>
        <Typography.Heading2>
          {strings.pages.dashboard.currentOpportunities}
        </Typography.Heading2>
        <S.OpportunitiesMainWrapper>
          {opportunities.map((op) => (
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

const EduSection: React.FC<PageProps> = ({ videos }) => {
  return (
    <Section id="section-cedu">
      <SectionContent>
        <S.CategoryHeader>
          <S.Title>{strings.pages.dashboard.cedu}</S.Title>
        </S.CategoryHeader>
        <S.Container>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mx-[20px] md:mx-0">
            {videos.map((video) => (
              <Video key={video.id} {...video} />
            ))}
          </div>
        </S.Container>
      </SectionContent>
    </Section>
  );
};

const Video = (video: YTPlaylistItem) => {
  return (
    <div className="pb-6">
      <LiteYouTubeEmbed
        id={video.snippet.resourceId.videoId}
        title={video.snippet.title}
        poster="hqdefault"
        noCookie={true}
      />
      <p className="text-[18px]">{video.snippet.title}</p>
    </div>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const { projects, events } = siteData;
  const videos = shuffled(siteData.videos).slice(0, 6);
  const opportunities = getFeaturedOpportunities(
    siteData.opportunities.filter((o) => o.status === "live")
  );
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

function getFeaturedOpportunities(
  opportunities: PortalOpportunity[],
  count = 3
): PortalOpportunity[] {
  // Let’s pick `count` projects to feature
  const featuredProjectIds = shuffleInPlace(
    unique(opportunities.map((o) => o.projectId))
  ).slice(0, count);
  if (featuredProjectIds.length < count) {
    // If we don’t have that many, just return random `count` opportunities
    return shuffleInPlace(opportunities.slice(0, count));
  } else {
    // Otherwise pick a random opportunity from each featured project
    return featuredProjectIds
      .map((id) => opportunities.filter((o) => o.projectId === id))
      .map((ops) => getRandomElem(ops))
      .flat();
  }
}

export default Dashboard;
