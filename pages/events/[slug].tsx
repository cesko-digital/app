import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { getAllEvents } from "../../lib/airtable-import";
import { PortalEvent } from "../../lib/portal-types";
import { prepareToSerialize } from "../../lib/utils";

type PageProps = {
  event: PortalEvent;
};

const Page: NextPage<PageProps> = ({ event }) => {
  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.summary}</p>
    </div>
  );
};

// TODO: Can we type this tighter?
export const getStaticPaths: GetStaticPaths = async () => {
  const apiKey = process.env.AIRTABLE_API_KEY as string;
  const events = await getAllEvents(apiKey);
  const paths = events.map((event) => ({
    params: { slug: event.slug },
  }));
  return {
    paths,
    fallback: false,
  };
};

// TODO: Can we type this tighter?
export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const apiKey = process.env.AIRTABLE_API_KEY as string;
  const events = await getAllEvents(apiKey);
  const event = events.find((e) => e.slug === params!.slug)!;
  return {
    props: prepareToSerialize({ event }),
    revalidate: 1,
  };
};

export default Page;
