import Image from "next/image";
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
        {events.map(EventCard)}
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

const ProjectCard = (project: Project) => (
  <a
    className="block border-2 border-gray rounded-xl overflow-clip relative"
    key={project.id}
    href={Route.toProject(project)}
  >
    <div className="aspect-[2] relative">
      <Image src={project.coverImageUrl} alt="" objectFit="cover" fill />
    </div>
    <Image
      src={project.logoUrl}
      alt=""
      width={80}
      height={80}
      className="drop-shadow-xl rounded-full -mt-[40px] ml-10 bg-white"
    />
    <div className="p-7 flex flex-col gap-4">
      <h3 className="typo-title3">{project.name}</h3>
      <p>{project.tagline}</p>
    </div>
  </a>
);

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

const EventCard = (e: Event) => (
  <a className="block" key={e.id} href={Route.toEvent(e)}>
    <h3 className="typo-title3">{e.name}</h3>
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
    <h3 className="typo-title3">{topic.title}</h3>
  </a>
);
