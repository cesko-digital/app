import EventCard from "components/dashboard/event-card";
import { Layout } from "components/layout";
import {
  compareEventsByTime,
  isEventPast,
  PortalEvent,
} from "lib/airtable/event";
import { PortalProject } from "lib/airtable/project";
import { siteData } from "lib/site-data";
import { Route } from "lib/routing";
import { GetStaticProps } from "next";

type PageProps = {
  futureEvents: PortalEvent[];
  pastEvents: PortalEvent[];
  projects: PortalProject[];
};

const Page = ({ futureEvents, pastEvents, projects }: PageProps) => {
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
        {futureEvents.length > 0 && (
          <>
            <h2 className="mb-12 mt-0">Nadcházející akce</h2>
            <p className="mb-7">
              Seznam našich akcí také můžete{" "}
              <a href="/events/feed.ical">odebírat ve formátu iCal</a>.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-20">
              {futureEvents.map((e) => (
                <EventCard key={e.id} event={e} project={projectForEvent(e)} />
              ))}
            </div>
          </>
        )}
        <h2 className="mb-12 mt-0">Proběhlé akce</h2>
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
  const events = siteData.events.filter((e) => e.published);
  const futureEvents = events
    .filter((e) => !isEventPast(e))
    .sort(compareEventsByTime);
  const pastEvents = events
    .filter((e) => isEventPast(e))
    .sort(compareEventsByTime)
    .reverse();
  const projects = siteData.projects.filter((p) =>
    // Only pick projects that we have some events for
    events.some((e) => e.projectId === p.id)
  );
  return {
    props: {
      futureEvents,
      pastEvents,
      projects,
    },
    // Regenerate every five minutes to refresh event info
    revalidate: 60 * 5,
  };
};

export default Page;
