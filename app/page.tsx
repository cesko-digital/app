import { EventCard } from "components/EventCard";
import { ProjectCard } from "components/ProjectCard";
import Image from "next/image";
import Link from "next/link";
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
import { toHTML as slackMarkupToHTML } from "slack-markdown";
import { getRandomElem, shuffleInPlace, shuffled, unique } from "src/utils";

/** Main home page of the whole website */
export default async function Home() {
  // TBD: Since we mostly just pick a few featured items here,
  // it would be better to filter in the DB to save on data transfer.
  const allProjects = await getAllProjects();
  const projects = await getFeaturedProjects();
  const opportunities = await getFeaturedOpportunities();
  const marketPlaceOffers = await getFeaturedMarketPlaceOffers();
  const events = await getFeaturedEvents();
  const discussionSummary = await getLatestTopicsSummary();

  const projectWithId = (id: string) => allProjects.find((p) => p.id === id);

  const MoreButton = ({ text, url }: { text: string; url: string }) => (
    <div className="text-center">
      <Link className="btn-primary inline-block" href={url}>
        {text}
      </Link>
    </div>
  );

  return (
    <main className="flex flex-col gap-20 py-20 px-7 max-w-content m-auto">
      <section>
        <h2 className="typo-title2 mb-1">Projekty</h2>
        <h3 className="typo-subtitle mb-7">Podtitulek domyslíme, děcka</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mb-10">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
        <MoreButton text="Zobrazit všechny projekty" url={Route.projects} />
      </section>

      <section>
        <h2 className="typo-title2 mb-1">Hledané role</h2>
        <h3 className="typo-subtitle mb-4">
          Zapojte se v projektech Česko.Digital
        </h3>
        <div className="mb-7">
          {opportunities.map((o) => (
            <OpportunityRow
              project={projectWithId(o.projectId)!}
              key={o.id}
              role={o}
            />
          ))}
        </div>
        <MoreButton
          text="Zobrazit všechny hledané role"
          url={Route.opportunities}
        />
      </section>

      <section>
        <h2 className="typo-title2 mb-1">Market-place</h2>
        <h3 className="typo-subtitle mb-7">
          Zapojte se v projektech mimo Česko.Digital
        </h3>
        <div className="grid md:grid-cols-3 gap-7 mb-7">
          {marketPlaceOffers.map(MarketPlaceOfferRow)}
        </div>
        <MoreButton text="Zobrazit všechny poptávky" url={Route.marketplace} />
      </section>

      <section>
        <h2 className="typo-title2 mb-4">Nejbližší akce</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mb-7">
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

const OpportunityRow = ({
  role,
  project,
}: {
  role: Opportunity;
  project: Project;
}) => {
  const pills = [role.timeRequirements, role.skills.join(" / ")];
  return (
    <Link
      className="flex flex-row gap-7 pb-7 mb-7 last border-b-2 border-pebble"
      key={role.id}
      href={Route.toOpportunity(role)}
    >
      <div>
        <h3 className="typo-title3 mb-2">{role.name}</h3>
        <p>
          {pills.map((p) => (
            <span
              key={p}
              className="inline-block px-2 mr-2 rounded-lg bg-pebble"
            >
              {p}
            </span>
          ))}
        </p>
      </div>
      <div className="ml-auto flex flex-row gap-4 items-center">
        <p>{project.name}</p>
        <Image
          src={project.logoUrl}
          className="rounded-full border-2 border-gray"
          width={80}
          height={80}
          alt=""
        />
      </div>
    </Link>
  );
};

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

const MarketPlaceOfferRow = (o: MarketPlaceOffer) => {
  const ArrowShape = () => (
    <div className="ml-[30px] w-0 h-0 border-t-[10px] border-t-gray border-r-[8px] border-r-transparent"></div>
  );
  return (
    <Link className="flex flex-col" href={o.slackThreadUrl}>
      <div className="rounded-xl border-2 border-gray p-4 bg-gray hover:border-it grow">
        <div className="line-clamp-6">
          <h3 className="inline font-bold mr-[1ex]">{o.title}</h3>
          <p className="inline">{htmlToText(slackMarkupToHTML(o.text))}</p>
        </div>
      </div>
      <ArrowShape />
      <div className="ml-1 mb-1 flex flex-row gap-2 items-center">
        <Image
          src={o.ownerAvatarUrl!}
          className="rounded-full"
          width={25}
          height={25}
          alt=""
        />
        <span className="typo-caption">{o.ownerName}</span>
      </div>
    </Link>
  );
};

async function getFeaturedMarketPlaceOffers(): Promise<MarketPlaceOffer[]> {
  const offers = await getPublishedMarketPlaceOffers();
  return offers.filter((o) => o.state === "published" && !!o.title).slice(0, 6);
}

// TBD: This is very naive, let’s do something better
function htmlToText(input: string) {
  const regex = /(<([^>]+)>)/gi;
  return input.replace(regex, "");
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
    <div className="grid md:grid-cols-3 gap-7 mb-20">
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
    <div className="ml-[30px] w-0 h-0 border-t-[10px] border-t-gray border-r-[8px] border-r-transparent"></div>
  );
  return (
    <Link className="flex flex-col" href={getTopicUrl(topic)}>
      <div className="rounded-xl border-2 border-gray p-4 bg-gray hover:border-it grow">
        {topic.title}
      </div>
      <ArrowShape />
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
    </Link>
  );
};
