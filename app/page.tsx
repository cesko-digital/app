import { EventCard } from "components/EventCard";
import { ProjectCard } from "components/ProjectCard";
import {
  Event,
  compareEventsByTime,
  getAllEvents,
  isEventPast,
} from "src/data/event";
import {
  MarketPlaceOffer,
  getPublishedMarketPlaceOffers,
} from "src/data/marker-place";
import { Opportunity, getAllOpportunities } from "src/data/opportunity";
import { Project, getAllProjects } from "src/data/project";
import { Topic, getLatestTopicsSummary, getTopicUrl } from "src/discourse";
import { Route } from "src/routing";
import { getRandomElem, shuffleInPlace, shuffled, unique } from "src/utils";

export default async function Home() {
  const projects = await getFeaturedProjects();
  const opportunities = await getFeaturedOpportunities();
  const marketPlaceOffers = await getFeaturedMarketPlaceOffers();
  const events = await getFeaturedEvents();
  const discussionSummary = await getLatestTopicsSummary();
  return (
    <main className="flex flex-col gap-10 p-20 max-w-content m-auto">
      <section>
        <h2 className="typo-title2 mb-4">Projekty</h2>
        <div className="grid grid-cols-3 gap-7">
          {projects.map(ProjectCard)}
        </div>
      </section>
      <section>
        <h2 className="typo-title2">Hledané role</h2>
        <h3 className="typo-subtitle mb-4">
          Zapojte se v projektech Česko.Digital
        </h3>
        {opportunities.map(OpportunityRow)}
      </section>
      <section>
        <h2 className="typo-title2">Market-place</h2>
        <h3 className="typo-subtitle mb-4">
          Zapojte se v projektech mimo Česko.Digital
        </h3>
        {marketPlaceOffers.map(MarketPlaceOfferRow)}
      </section>
      <section>
        <h2 className="typo-title2 mb-4">Nejbližší akce</h2>
        <div className="grid grid-cols-3 gap-7">{events.map(EventCard)}</div>
      </section>
      <section>
        <h2 className="typo-title2 mb-4">Diskuze</h2>
        {discussionSummary.topic_list.topics.map(DiscussionTopicRow)}
      </section>
    </main>
  );
}

//
// Projects
//

async function getFeaturedProjects(): Promise<Project[]> {
  const canBeFeatured = (p: Project) =>
    p.state === "incubating" || p.state === "running";
  const allProjects = await getAllProjects();
  return shuffled(allProjects).filter(canBeFeatured).slice(0, 3);
}

//
// Opportunities
//

const OpportunityRow = (o: Opportunity) => (
  <a className="block" key={o.id} href={Route.toOpportunity(o)}>
    <h3 className="typo-title3">{o.name}</h3>
    <p>
      {o.timeRequirements} {o.skills}
    </p>
  </a>
);

async function getFeaturedOpportunities(count = 3): Promise<Opportunity[]> {
  const opportunities = await getAllOpportunities();
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

//
// Market-place
//

const MarketPlaceOfferRow = (o: MarketPlaceOffer) => (
  <div key={o.id}>
    <h3 className="typo-title3">{o.title}</h3>
    <p className="line-clamp-1">{o.text}</p>
  </div>
);

async function getFeaturedMarketPlaceOffers(): Promise<MarketPlaceOffer[]> {
  const offers = await getPublishedMarketPlaceOffers();
  return offers.filter((o) => o.state === "published" && !!o.title).slice(0, 5);
}

//
// Events
//

async function getFeaturedEvents(): Promise<Event[]> {
  const events = await getAllEvents("Live Events");
  return events
    .filter((e) => e.published)
    .filter((e) => !isEventPast(e))
    .sort(compareEventsByTime)
    .slice(0, 3);
}

//
// Discussions
//

const DiscussionTopicRow = (topic: Topic) => (
  <a className="block" key={topic.id} href={getTopicUrl(topic)}>
    <h3 className="typo-title3">{topic.title}</h3>
  </a>
);
