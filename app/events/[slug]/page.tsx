import { Breadcrumbs } from "components/Breadcrumbs";
import { MarkdownContent } from "components/MarkdownContent";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Event, findEventsWithSlug } from "src/data/event";
import { Project, findProjectById } from "src/data/project";
import { Route } from "src/routing";

type Params = {
  slug: string;
};

export type Props = {
  params: Params;
};

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
          <Sidebar event={event} project={project} />
        </aside>
      </div>
    </main>
  );
}

const Sidebar = ({ event, project }: { event: Event; project: Project }) => {
  return (
    <div className="p-7 bg-pebble rounded-xl">
      <h2 className="typo-title3 mb-4">Projekt</h2>
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
    </div>
  );
};

export default Page;
