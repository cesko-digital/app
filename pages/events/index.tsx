import type { NextPage, GetStaticProps } from "next";
import { getAllEvents } from "../../lib/airtable-import";
import { PortalEvent } from "../../lib/portal-types";
import { prepareToSerialize } from "../../lib/utils";

type PageProps = {
  events: PortalEvent[];
};

const Page: NextPage<PageProps> = ({ events }) => {
  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map((event) => (
          <li>
            <EventLink {...event} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const EventLink: React.FC<PortalEvent> = (event) => {
  const path = `/events/${event.slug}`;
  return <a href={path}>{event.name}</a>;
};

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const apiKey = process.env.AIRTABLE_API_KEY as string;
  const events = await getAllEvents(apiKey);
  return {
    props: {
      events: prepareToSerialize(events),
    },
  };
};

export default Page;
