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
import { Route } from "~/src/routing";

/** Refresh data every 10 minutes */
export const revalidate = 600;

/** Main home page of the whole website */
export default async function Home() {
  // TBD: Since we mostly just pick a few featured items here,
  // it would be better to filter in the DB to save on data transfer.
  const allProjects = await getAllProjects();
  const projects = await getFeaturedProjects();
  const opportunities = await getFeaturedOpportunities();
  const events = await getFeaturedEvents();

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
