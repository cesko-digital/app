import { Breadcrumbs } from "components/Breadcrumbs";
import { EventCard } from "components/EventCard";
import { LegacyUserImageLabel, ProjectImageLabel } from "components/ImageLabel";
import { MarkdownContent } from "components/MarkdownContent";
import { Sidebar } from "components/Sidebar";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Event,
  compareEventsByTime,
  getAllEvents,
  getEventDuration,
  isEventPast,
} from "src/data/event";
import { LegacyUser, getUserById } from "src/data/legacy-user";
import { Project, getProjectById } from "src/data/project";
import { Route } from "src/routing";

type Params = {
  slug: string;
};

export type Props = {
  params: Params;
};

/** Event detail page */
async function Page({ params }: Props) {
  const allEvents = await getAllEvents("Live Events");
  const event = allEvents.find((e) => e.slug === params.slug);
  if (!event) {
    notFound();
  }

  const project = await getProjectById(event.projectId);
  if (!project) {
    notFound();
  }

  const owner = await getUserById(event.ownerId);
  if (!owner) {
    notFound();
  }

  const otherEvents = allEvents
    .filter((e) => e.id !== event.id)
    .sort(compareByRelevance)
    .slice(0, 3);

  return (
    <main className="py-20 px-7 max-w-content m-auto">
      <Breadcrumbs
        path={[
          { label: "Homepage", path: "/" },
          { label: "Akce", path: Route.events },
        ]}
        currentPage={event.name}
      />

      <h1 className="typo-title mt-7 mb-2">{event.name}</h1>
      <h2 className="typo-subtitle mb-10 max-w-prose">{event.summary}</h2>
      <div className="aspect-[2.3] relative mb-10">
        <Image
          src={event.coverImageUrl!}
          className="object-cover bg-gray"
          alt=""
          fill
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mb-20">
        <section className="lg:col-span-2">
          <h2 className="typo-title2">O akci</h2>
          <MarkdownContent source={event.description.source} />
        </section>
        <aside>
          <EventSidebar event={event} project={project} owner={owner} />
        </aside>
      </div>

      <h2 className="typo-title2 mb-4">Další akce</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        {otherEvents.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </main>
  );
}

const EventSidebar = ({
  event,
  project,
  owner,
}: {
  event: Event;
  project: Project;
  owner: LegacyUser;
}) => {
  const time = new Date(event.startTime).toLocaleString("cs-CZ", {
    weekday: "short",
    day: "numeric",
    month: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Sidebar
      primaryCTA={
        event.registrationUrl ? <RegistrationButton event={event} /> : undefined
      }
      sections={[
        {
          label: "Projekt",
          content: <ProjectImageLabel project={project} />,
        },
        {
          label: "Kontakt",
          content: (
            <LegacyUserImageLabel user={owner} link={`mailto:${owner.email}`} />
          ),
        },
        {
          label: "Datum konání",
          content: time,
        },
        {
          label: "Délka akce",
          content: getEventDuration(event),
        },
        {
          label: "Místo konání",
          onlyIf: !!event.locationUrl,
          content: (
            <a className="typo-link" href={event.locationUrl}>
              {event.locationTitle}
            </a>
          ),
        },
        {
          label: "Místo konání",
          onlyIf: !event.locationUrl,
          content: event.locationTitle,
        },
      ]}
    />
  );
};

const RegistrationButton = ({ event }: { event: Event }) => (
  <div>
    <a href={event.registrationUrl} className="block btn-primary text-center">
      {event.registrationTitle}
    </a>
  </div>
);

/** Sort future events first, sorted ascending date */
const compareByRelevance = (a: Event, b: Event) => {
  const pastA = isEventPast(a);
  const pastB = isEventPast(b);
  if (pastA && !pastB) {
    return 1; // a after b
  } else if (pastB && !pastA) {
    return -1; // a before b
  } else {
    return compareEventsByTime(a, b);
  }
};

export default Page;
