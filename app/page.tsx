import Image from "next/image";
import Link from "next/link";

import { EventCard } from "~/components/EventCard";
import { OpportunityRow } from "~/components/OpportunityRow";
import { ProjectCard } from "~/components/ProjectCard";
import {
  compareEventsByTime,
  getAllEvents,
  isEventPast,
  type Event,
} from "~/src/data/event";
import { getAllProjects, type Project } from "~/src/data/project";
import { getFeaturedOpportunities } from "~/src/data/queries";
import { Categories, getBubbles, type Bubble } from "~/src/discourse";
import { Route } from "~/src/routing";
import { stripMarkdown } from "~/src/utils";

/** Refresh data every 5 minutes */
export const revalidate = 300;

/** Main home page of the whole website */
export default async function Home() {
  // TBD: Since we mostly just pick a few featured items here,
  // it would be better to filter in the DB to save on data transfer.
  const allProjects = await getAllProjects();
  const projects = await getFeaturedProjects();
  const opportunities = await getFeaturedOpportunities();
  const events = await getFeaturedEvents();

  const discussionSummary = await getBubbles({
    categoryId: Categories.general,
    skipTopicIds: [3, 5 /* welcome posts */],
    maxCount: 6,
  });

  const marketplaceSummary = await getBubbles({
    categoryId: Categories.marketplace,
    skipTopicIds: [35 /* welcome post */],
    maxCount: 6,
  });

  const projectWithId = (id: string) => allProjects.find((p) => p.id === id);

  const MoreButton = ({
    text,
    url,
    external = false,
  }: {
    text: string;
    url: string;
    external?: boolean;
  }) => (
    <div className="text-center">
      <Link
        className="btn-primary block md:inline-block"
        href={url}
        target={external ? "_blank" : undefined}
      >
        {text}
      </Link>
    </div>
  );

  return (
    <main className="m-auto flex max-w-content flex-col gap-20 px-7 py-20">
      <section>
        <h2 className="typo-title2 mb-1">Projekty</h2>
        <h3 className="typo-subtitle mb-7">Na čem právě pracujeme</h3>
        <div className="mb-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
        <MoreButton text="Zobrazit všechny projekty" url={Route.projects} />
      </section>

      <section>
        <h2 className="typo-title2 mb-1">Hledané role</h2>
        <h3 className="typo-subtitle mb-5">Zapoj se v našich projektech</h3>
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
        <h2 className="typo-title2 mb-1">Tržiště</h2>
        <h3 className="typo-subtitle mb-7">
          Zapoj se krátce v projektech mimo Česko.Digital
        </h3>
        <DiscussionSummaryBox bubbles={marketplaceSummary} />
        <MoreButton
          text="Otevřít Tržiště ↗"
          url={Route.marketplace}
          external
        />
      </section>

      {events.length > 0 && (
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
      )}

      <section>
        <h2 className="typo-title2 mb-1">Diskuze</h2>
        <h3 className="typo-subtitle mb-7">
          Potřebuješ poradit? Chceš poradit? Diskutuj o digitalizaci Česka
        </h3>
        <DiscussionSummaryBox bubbles={discussionSummary} />
        <MoreButton
          text="Otevřít diskuzní fórum ↗"
          url={Route.forum}
          external
        />
      </section>
    </main>
  );
}

//
// Projects
//

async function getFeaturedProjects(): Promise<Project[]> {
  const isFeatured = (p: Project) => p.featureFlags.includes("featured");
  const allProjects = await getAllProjects();
  return allProjects.filter(isFeatured).slice(0, 3);
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

const DiscussionSummaryBox = ({ bubbles }: { bubbles: Bubble[] }) => {
  return (
    <div className="mb-20 grid gap-7 md:grid-cols-3">
      {bubbles.map((bubble) => (
        <DiscussionBubble key={bubble.id} bubble={bubble} />
      ))}
    </div>
  );
};

const DiscussionBubble = ({ bubble }: { bubble: Bubble }) => {
  const ArrowShape = () => (
    <div className="ml-[30px] h-0 w-0 border-r-[8px] border-t-[10px] border-r-transparent border-t-gray group-hover:border-t-it"></div>
  );
  return (
    <Link
      className="group flex min-w-0 flex-col"
      href={bubble.topicUrl}
      target="_blank"
    >
      <div className="grow overflow-hidden rounded-xl border-2 border-gray bg-gray p-4 group-hover:border-it">
        <p className="line-clamp-5">
          <span className="mr-2 font-semibold">{bubble.title}</span>
          {stripMarkdown(bubble.rawFirstPost.replaceAll(/\n\n*/g, " "))}
        </p>
      </div>
      <ArrowShape />
      <div className="mb-1 ml-1 flex flex-row items-center gap-1">
        {bubble.posterAvatars.map((url) => (
          <Image
            key={url}
            src={url}
            className="rounded-full"
            width={25}
            height={25}
            alt=""
          />
        ))}
      </div>
    </Link>
  );
};
