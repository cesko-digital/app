import { Fragment } from "react";
import { type Metadata } from "next";

import { Breadcrumbs } from "~/components/Breadcrumbs";
import { EventCard } from "~/components/EventCard";
import {
  compareEventsByTime,
  getAllEvents,
  isEventPast,
  type Event,
} from "~/src/data/event";
import { getAllProjects } from "~/src/data/project";
import { Route } from "~/src/routing";

export const metadata: Metadata = {
  title: "Akce | Česko.Digital",
  description: `Pojďme se potkat! Online, naživo, v Praze, v Brně,
  na vzdělávacím webináři, praktickém workshopu – zkrátka kdekoliv
  a jakkoliv. Některé z těchto akcí pořádáme přímo my, na některých
  spolupracujeme s partnery. Na všech vás ale rádi uvidíme.`,
};

/** Page listing all our events */
async function Page() {
  const events = await getAllEvents("Live Events");
  const projects = await getAllProjects();
  const futureEvents = events
    .filter((e) => !isEventPast(e))
    .sort(compareEventsByTime);
  const pastEvents = events
    .filter((e) => isEventPast(e))
    .sort(compareEventsByTime)
    .reverse();
  const projectForEvent = (e: Event) =>
    projects.find((p) => p.id === e.projectId);

  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs
        path={[{ label: "Homepage", path: "/" }]}
        currentPage="Akce"
      />

      <h1 className="typo-title mb-10 mt-7">Akce</h1>

      <div className="mb-20 flex flex-col gap-7">
        <p className="max-w-prose">{metadata.description}</p>
        <div>
          <a href={Route.eventFeed} className="btn-primary">
            Stáhnout kalendář akcí
          </a>
        </div>
      </div>

      {futureEvents.length > 0 && (
        <Fragment>
          <h2 className="typo-title2 mb-4">Nadcházející akce</h2>
          <div className="mb-20 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {futureEvents.map((e) => (
              <EventCard
                badgeImageUrl={projectForEvent(e)?.logoUrl}
                key={e.id}
                event={e}
              />
            ))}
          </div>
        </Fragment>
      )}

      <h2 className="typo-title2 mb-4">Proběhlé akce</h2>
      <div className="mb-20 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {pastEvents.map((e) => (
          <EventCard
            badgeImageUrl={projectForEvent(e)?.logoUrl}
            key={e.id}
            event={e}
          />
        ))}
      </div>
    </main>
  );
}

export default Page;
