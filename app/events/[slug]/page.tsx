import { Breadcrumbs } from "components/Breadcrumbs";
import { MarkdownContent } from "components/MarkdownContent";
import { Sidebar } from "components/Sidebar";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Event, findEventsWithSlug, getEventDuration } from "src/data/event";
import { Project, findProjectById } from "src/data/project";
import { Route } from "src/routing";

type Params = {
  slug: string;
};

export type Props = {
  params: Params;
};

/** Event detail page */
async function Page({ params }: Props) {
  const [event] = await findEventsWithSlug(params.slug);
  if (!event) {
    notFound();
  }

  const project = await findProjectById(event.projectId);
  if (!project) {
    notFound();
  }

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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        <section className="lg:col-span-2">
          <MarkdownContent source={event.description.source} />
        </section>
        <aside>
          <EventSidebar event={event} project={project} />
        </aside>
      </div>
    </main>
  );
}

const EventSidebar = ({
  event,
  project,
}: {
  event: Event;
  project: Project;
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
          content: <ProjectLogoRow project={project} />,
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

const ProjectLogoRow = ({ project }: { project: Project }) => (
  <div className="flex flex-row gap-4 items-center">
    <Image
      src={project.logoUrl}
      className="rounded-full"
      width={60}
      height={60}
      alt=""
    />
    <span>{project.name}</span>
  </div>
);

export default Page;
