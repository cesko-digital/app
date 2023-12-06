import Image from "next/image";
import Link from "next/link";

import { toHTML as slackMarkupToHTML } from "slack-markdown";

import { EventCard } from "~/components/EventCard";
import { OpportunityRow } from "~/components/OpportunityRow";
import { ProjectCard } from "~/components/ProjectCard";
import {
  compareEventsByTime,
  getAllEvents,
  isEventPast,
  type Event,
} from "~/src/data/event";
import {
  getPublishedMarketPlaceOffers,
  type MarketPlaceOffer,
} from "~/src/data/market-place";
import { getAllProjects, type Project } from "~/src/data/project";
import { getFeaturedOpportunities } from "~/src/data/queries";
import {
  getLatestTopicsSummary,
  getTopicUrl,
  getUserAvatar,
  type LatestTopicsSummary,
  type Topic,
} from "~/src/discourse";
import { Route } from "~/src/routing";
import { shuffled } from "~/src/utils";

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
      <Link className="btn-primary block md:inline-block" href={url}>
        {text}
      </Link>
    </div>
  );

  return (
    <main className="m-auto flex max-w-content flex-col gap-20 px-7 py-20">
      <section>
        <h2 className="typo-title2 mb-1">Projekty</h2>
        <h3 className="typo-subtitle mb-7">Podtitulek domyslíme, děcka</h3>
        <div className="mb-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
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
              project={projectWithId(o.projectId)}
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
        <div className="mb-7 grid gap-7 md:grid-cols-3">
          {marketPlaceOffers.map(MarketPlaceOfferRow)}
        </div>
        <MoreButton text="Zobrazit všechny poptávky" url={Route.marketplace} />
      </section>

      <section>
        <h2 className="typo-title2 mb-4">Nejbližší akce</h2>
        <div className="mb-7 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
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
// Market-place
//

const MarketPlaceOfferRow = (o: MarketPlaceOffer) => {
  const ArrowShape = () => (
    <div className="ml-[30px] h-0 w-0 border-r-[8px] border-t-[10px] border-r-transparent border-t-gray group-hover:border-t-it"></div>
  );
  return (
    <Link className="group flex flex-col" href={Route.toMarketPlaceOffer(o)}>
      <div className="grow rounded-xl border-2 border-gray bg-gray p-4 group-hover:border-it">
        <div className="line-clamp-6">
          <h3 className="mr-[1ex] inline font-bold">{o.title}</h3>
          <p className="inline">{htmlToText(slackMarkupToHTML(o.text))}</p>
        </div>
      </div>
      <ArrowShape />
      <div className="mb-1 ml-1 flex flex-row items-center gap-2">
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
    <div className="mb-20 grid gap-7 md:grid-cols-3">
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
    <div className="ml-[30px] h-0 w-0 border-r-[8px] border-t-[10px] border-r-transparent border-t-gray group-hover:border-t-it"></div>
  );
  return (
    <Link className="group flex flex-col" href={getTopicUrl(topic)}>
      <div className="grow rounded-xl border-2 border-gray bg-gray p-4 group-hover:border-it">
        {topic.title}
      </div>
      <ArrowShape />
      <div className="mb-1 ml-1 flex flex-row items-center gap-2">
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
