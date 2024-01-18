import { type Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { QuickRegistrationButton } from "~/app/events/[slug]/QuickRegistrationButton";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { EventCard } from "~/components/EventCard";
import {
  LegacyUserImageLabel,
  ProjectImageLabel,
} from "~/components/ImageLabel";
import { MarkdownContent } from "~/components/MarkdownContent";
import { Sidebar, SidebarSection } from "~/components/Sidebar";
import {
  compareEventsByTime,
  getAllEvents,
  getEventDuration,
  isEventPast,
  type Event,
} from "~/src/data/event";
import { getUserById, type LegacyUser } from "~/src/data/legacy-user";
import { getProjectById, type Project } from "~/src/data/project";
import { Route } from "~/src/routing";

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
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs
        path={[
          { label: "Homepage", path: "/" },
          { label: "Akce", path: Route.events },
        ]}
        currentPage={event.name}
      />

      <h1 className="typo-title mb-2 mt-7">{event.name}</h1>
      <h2 className="typo-subtitle mb-10 max-w-prose">{event.summary}</h2>
      <div className="relative mb-10 aspect-[2.3]">
        <Image
          src={event.coverImageUrl!}
          className="bg-gray object-cover"
          alt=""
          fill
        />
      </div>

      <div className="mb-20 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="typo-title2">O akci</h2>
          <MarkdownContent source={event.description.source} />
        </section>
        <aside>
          <EventSidebar event={event} project={project} owner={owner} />
        </aside>
      </div>

      <h2 className="typo-title2 mb-4">Další akce</h2>
      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
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
    timeZone: "Europe/Prague",
    weekday: "short",
    day: "numeric",
    month: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <Sidebar>
      <SidebarSection title="Projekt">
        <ProjectImageLabel project={project} />
      </SidebarSection>
      <SidebarSection title="Kontakt">
        <LegacyUserImageLabel user={owner} link={`mailto:${owner.email}`} />
      </SidebarSection>
      <SidebarSection title="Datum konání">{time}</SidebarSection>
      <SidebarSection title="Délka akce">
        {getEventDuration(event)}
      </SidebarSection>
      {event.locationUrl && (
        <SidebarSection title="Místo konání">
          <a className="typo-link" href={event.locationUrl}>
            {event.locationTitle}
          </a>
        </SidebarSection>
      )}
      {!event.locationUrl && (
        <SidebarSection title="Místo konání">
          {event.locationTitle}
        </SidebarSection>
      )}
      <div className="flex flex-col gap-4">
        {event.registrationUrl && <RegistrationButton event={event} />}
        {event.quickRegistrationMode && (
          <QuickRegistrationButton event={event} />
        )}
        <a
          className="btn-inverted block text-center"
          href={`${event.slug}/ical`}
        >
          Stáhnout do kalendáře
        </a>
      </div>
    </Sidebar>
  );
};

const RegistrationButton = ({ event }: { event: Event }) => (
  <div>
    <a href={event.registrationUrl} className="btn-primary block text-center">
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

//
// Metadata
//

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const allEvents = await getAllEvents("Live Events");
  const event = allEvents.find((e) => e.slug === params.slug);
  if (!event) {
    return {};
  }
  return {
    title: `${event.name} | Česko.Digital`,
    description: event.summary,
    openGraph: { images: event.coverImageUrl },
  };
}

export default Page;
