import { Breadcrumbs } from "components/Breadcrumbs";
import { EventCard } from "components/EventCard";
import {
  Event,
  compareEventsByTime,
  getAllEvents,
  isEventPast,
} from "src/data/event";
import { getAllProjects } from "src/data/project";
import { loremIpsum } from "src/utils";

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
    <main className="py-20 px-7 max-w-content m-auto">
      <Breadcrumbs
        path={[{ label: "Homepage", path: "/" }]}
        currentPage="Akce"
      />

      <h1 className="typo-title mt-4 mb-10">Akce</h1>
      <p className="max-w-prose mb-10">{loremIpsum}</p>

      <h2 className="typo-title2 mb-4">Nadcházející akce</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mb-20">
        {futureEvents.map((e) => (
          <EventCard
            badgeImageUrl={projectForEvent(e)?.logoUrl}
            key={e.id}
            event={e}
          />
        ))}
      </div>

      <h2 className="typo-title2 mb-4">Proběhlé akce</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mb-20">
        {pastEvents.map((e) => (
          <EventCard
            badgeImageUrl={projectForEvent(e)?.logoUrl}
            key={e.id}
            event={e}
            fade={true}
          />
        ))}
      </div>
    </main>
  );
}

export default Page;
