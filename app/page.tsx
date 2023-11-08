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
    <main className="flex flex-col gap-10 p-20">
      <section>
        <h2 className="text-2xl">Projekty</h2>
        {projects.map(ProjectCard)}
      </section>
      <section>
        <h2 className="text-2xl">Hledané role</h2>
        {opportunities.map(OpportunityRow)}
      </section>
      <section>
        <h2 className="text-2xl">Market-place</h2>
        {marketPlaceOffers.map(MarketPlaceOfferRow)}
      </section>
      <section>
        <h2 className="text-2xl">Akce</h2>
        {events.map(EventCard)}
      </section>
      <section>
        <h2 className="text-2xl">Diskuze</h2>
        {discussionSummary.topic_list.topics.map(DiscussionTopicRow)}
      </section>
    </main>
  );
}

//
// Projects
//

const ProjectCard = (project: Project) => (
  <a className="block" key={project.id} href={Route.toProject(project)}>
    <h3>{project.name}</h3>
    <p>{project.tagline}</p>
  </a>
);

async function getFeaturedProjects(): Promise<Project[]> {
  const canBeFeatured = (p: Project) =>
    p.state === "finished" || p.state === "incubating" || p.state === "running";
  const allProjects = await getAllProjects();
  return shuffled(allProjects).filter(canBeFeatured).slice(0, 3);
}

//
// Opportunities
//

const OpportunityRow = (o: Opportunity) => (
  <a className="block" key={o.id} href={Route.toOpportunity(o)}>
    <h2>{o.name}</h2>
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
    <h3>{o.title}</h3>
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

const EventCard = (e: Event) => (
  <a className="block" key={e.id} href={Route.toEvent(e)}>
    <h3>{e.name}</h3>
    <p>{e.summary}</p>
  </a>
);

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
    <h3>{topic.title}</h3>
  </a>
);
