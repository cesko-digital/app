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
import { Link } from "components/links";
import { default as NextLink } from "next/link";
import { getRandomElem, shuffleInPlace, unique } from "lib/utils";
import { PortalProject } from "lib/airtable/project";
import { PortalOpportunity } from "lib/airtable/opportunity";
import { YTPlaylistItem } from "lib/data-sources/youtube";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { MarketPlaceOffer } from "lib/airtable/market-place";
import { toHTML as slackMarkupToHTML } from "slack-markdown";
import {
  compareEventsByTime,
  isEventPast,
  PortalEvent,
} from "lib/airtable/event";

interface PageProps {
  marketPlaceOffers: readonly MarketPlaceOffer[];
  opportunities: readonly PortalOpportunity[];
  upcomingEvents: readonly PortalEvent[];
  projects: readonly PortalProject[];
  videos: readonly YTPlaylistItem[];
}

interface Props {
  offer: MarketPlaceOffer;
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
      {props.marketPlaceOffers.length > 0 && <MarketPlaceSection {...props} />}
      {props.upcomingEvents.length > 0 && <EventsSection {...props} />}
      {props.videos.length > 0 && <EduSection {...props} />}
    </Layout>
  );
};

const MarketPlaceSection: React.FC<PageProps> = ({
  marketPlaceOffers: offers,
}) => {
  return (
    <Section id="marketplace">
      <SectionContent>
        <Typography.Heading2>
          {strings.pages.dashboard.marketplaceOffers}
        </Typography.Heading2>
        <Typography.Body>
          Příležitosti k zapojení v projektech mimo Česko.Digital
        </Typography.Body>
        <div className="max-w-content py-2 lg:py-5 m-auto relative">
          {offers.map((offer) => (
            <Offer key={offer.id} offer={offer} />
          ))}
        </div>
      </SectionContent>
      <S.ButtonWrapper>
        <NextLink href={Route.marketplace}>
          <a>
            <Button>Více podobných nabídek</Button>
          </a>
        </NextLink>
      </S.ButtonWrapper>
    </Section>
  );
};

const Offer: React.FC<Props> = ({ offer }) => {
  // TODO: Truncate text to first sentence
  let htmlContent = slackMarkupToHTML(offer.text);
  htmlContent = htmlToText(htmlContent);
  let firstSentence = htmlContent.split(".")[0];
  let trailContent = htmlContent.replaceAll(firstSentence + ".", "");
  return (
    <div className="flex py-4 border-solid border-f0f0f2 border-b last:border-none">
      <div className="mr-10 md:truncate text-slate-400">
        <span className="text-black font-medium mr-1">
          {firstSentence + ". "}
        </span>
        <span className="text-slate-400 md:inline hidden">{trailContent}</span>
      </div>
      <div>
        <NextLink href={Route.marketplace + "#" + offer.id}>
          <a>Detail</a>
        </NextLink>
      </div>
    </div>
  );
};

// TODO: Refactor :)
function htmlToText(input: string) {
  const regex = /(<([^>]+)>)/gi;
  return input.replace(regex, "");
}

const OpportunitiesSection: React.FC<PageProps> = ({
  opportunities,
  projects,
}) => {
  const opportunityProject = (o: PortalOpportunity) =>
    projects.find((p) => p.id === o.projectId)!;
  // How should we sort this? How about a random sort?
  return (
    <Section id="opportunities">
      <SectionContent>
        <Typography.Heading2>
          {strings.pages.dashboard.currentOpportunities}
        </Typography.Heading2>
        <Typography.Body>Zapojte se v projektech Česko.Digital</Typography.Body>
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
          <NextLink href={Route.opportunities}>
            <a>
              <Button>{strings.pages.dashboard.moreOpportunities}</Button>
            </a>
          </NextLink>
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
        <div className="flex flex-row flex-wrap justify-between items-end">
          <div className="mb-3 md:mb-0">
            <S.Title>{strings.pages.dashboard.cedu}</S.Title>
          </div>
          <Link to={Route.youtube}>Všechna videa</Link>
        </div>
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
  const marketPlaceOffers = siteData.marketPlaceOffers.filter(
    (o) => o.state === "published"
  );
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
      marketPlaceOffers,
      upcomingEvents,
      opportunities,
      videos,
      projects,
    },
    revalidate: 120, // Refresh every two minutes
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
