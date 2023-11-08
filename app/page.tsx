import { EventCard } from "components/EventCard";
import { ProjectCard } from "components/ProjectCard";
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
import {
  LatestTopicsSummary,
  Topic,
  getLatestTopicsSummary,
  getTopicUrl,
  getUserAvatar,
} from "src/discourse";
import { Route } from "src/routing";
import { getRandomElem, shuffleInPlace, shuffled, unique } from "src/utils";

export default async function Home() {
  const allProjects = await getAllProjects();
  const projects = await getFeaturedProjects();
  const opportunities = await getFeaturedOpportunities();
  const marketPlaceOffers = await getFeaturedMarketPlaceOffers();
  const events = await getFeaturedEvents();
  const discussionSummary = await getLatestTopicsSummary();

  const projectWithId = (id: string) => allProjects.find((p) => p.id === id);

  const MoreButton = ({ text, url }: { text: string; url: string }) => (
    <div className="text-center">
      <a className="btn-primary inline-block" href={url}>
        {text}
      </a>
    </div>
  );

  return (
    <main className="flex flex-col gap-20 p-20 max-w-content m-auto">
      <section>
        <h2 className="typo-title2 mb-4">Projekty</h2>
        <div className="grid grid-cols-3 gap-7 mb-10">
          {projects.map(ProjectCard)}
        </div>
        <MoreButton text="Zobrazit všechny projekty" url={Route.projects} />
      </section>
      <section>
        <h2 className="typo-title2 mb-1">Hledané role</h2>
        <h3 className="typo-subtitle mb-4">
          Zapojte se v projektech Česko.Digital
        </h3>
        <div className="mb-7">{opportunities.map(OpportunityRow)}</div>
        <MoreButton
          text="Zobrazit všechny hledané role"
          url={Route.opportunities}
        />
      </section>
      <section>
        <h2 className="typo-title2 mb-1">Market-place</h2>
        <h3 className="typo-subtitle mb-4">
          Zapojte se v projektech mimo Česko.Digital
        </h3>
        <div className="mb-7">{marketPlaceOffers.map(MarketPlaceOfferRow)}</div>
        <MoreButton text="Zobrazit všechny poptávky" url={Route.marketplace} />
      </section>
      <section>
        <h2 className="typo-title2 mb-4">Nejbližší akce</h2>
        <div className="grid grid-cols-3 gap-7 mb-7">
          {events.map((e) => (
            <EventCard
              key={e.id}
              badgeImageUrl={projectWithId(e.projectId)?.logoUrl}
              event={e}
            />
          ))}
        </div>
        <MoreButton text="Zobrazit všechny akce" url={Route.events} />
      </section>
      <section>
        <h2 className="typo-title2 mb-1">Diskuze</h2>
        <h3 className="typo-subtitle mb-7">
          Potřebujete poradit? Chcete poradit? Diskutujte o digitalizaci Česka
        </h3>
        <DiscussionSummaryBox summary={discussionSummary} />
        <MoreButton text="Navštívit diskuzní fórum" url={Route.forum} />
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

const DiscussionSummaryBox = ({
  summary,
}: {
  summary: LatestTopicsSummary;
}) => {
  const { topic_list, users } = summary;
  const featuredTopics = topic_list.topics
    .filter((t) => t.id !== 5 /* skip welcome post */)
    .slice(0, 6);

  const userForId = (id: number) => users.find((u) => u.id === id)!;

  const avatarForTopic = (topic: Topic) => {
    const authorUserId = topic.posters[0]!.user_id;
    return getUserAvatar(userForId(authorUserId), 200);
  };

  return (
    <div className="grid grid-cols-3 gap-7 mb-20">
      {featuredTopics.map((topic) => (
        <DiscussionBubble
          key={topic.id}
          topic={topic}
          authorName={userForId(topic.posters[0]!.user_id).name}
          avatarUrl={avatarForTopic(topic)}
        />
      ))}
    </div>
  );
};

const DiscussionBubble = ({
  topic,
  authorName,
  avatarUrl,
}: {
  topic: Topic;
  authorName: string;
  avatarUrl: string;
}) => {
  const ArrowShape = () => (
    <div className="ml-[30px] w-0 h-0 border-b-[10px] border-b-gray border-r-[8px] border-r-transparent"></div>
  );
  return (
    <a className="block" href={getTopicUrl(topic)}>
      <div className="ml-1 mb-1 flex flex-row gap-2 items-center">
        <Image
          src={avatarUrl}
          className="rounded-full"
          width={25}
          height={25}
          alt=""
        />
        <span className="typo-caption">{authorName}</span>
      </div>
      <ArrowShape />
      <div className="rounded-xl border-2 border-gray p-4 bg-gray hover:border-it">
        {topic.title}
      </div>
    </a>
  );
};
