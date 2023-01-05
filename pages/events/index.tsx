import { GetStaticProps } from "next";
import { siteData } from "lib/site-data";
import {
  compareEventsByTime,
  isEventPast,
  PortalEvent,
} from "lib/airtable/event";
import { Layout } from "components/layout";
import EventCard from "components/dashboard/event-card";
import { PortalProject } from "lib/airtable/project";
import { Route } from "lib/utils";

type PageProps = {
  events: readonly PortalEvent[];
  projects: readonly PortalProject[];
};

const Page = ({ events, projects }: PageProps) => {
  const futureEvents = events
    .filter((e) => !isEventPast(e))
    .sort(compareEventsByTime);
  const pastEvents = events
    .filter((e) => isEventPast(e))
    .sort(compareEventsByTime)
    .reverse();
  const projectForEvent = (e: PortalEvent) =>
    projects.find((p) => e.projectId === p.id)!;
  return (
    <Layout
      crumbs={[
        { label: "Portál dobrovolníka", path: Route.dashboard },
        { label: "Akce" },
      ]}
      head={{ title: "Akce" }}
    >
      <section className="max-w-content m-auto py-10 px-5 text-xl">
        <h2 className="mb-12 mt-0">Nadcházející akce</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-20">
          {futureEvents.map((e) => (
            <EventCard key={e.id} event={e} project={projectForEvent(e)} />
          ))}
        </div>
        <h2 className="mb-12 mt-0">Starší akce</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {pastEvents.map((e) => (
            <EventCard key={e.id} event={e} project={projectForEvent(e)} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const events = siteData.events.filter(
    (e) => e.status === "live" || e.status === "unlisted"
  );
  const projects = siteData.projects.filter((p) =>
    events.some((e) => e.projectId === p.id)
  );
  return {
    props: {
      events,
      projects,
    },
  };
};

export default Page;
