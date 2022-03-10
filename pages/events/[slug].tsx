import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { siteData } from "lib/site-data";
import { EventPage, PageProps } from "components/events/page";

interface QueryParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const paths = siteData.events.map((event) => ({
    params: { slug: event.slug },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps, QueryParams> = async (
  context
) => {
  const { slug } = context.params!;
  const { projects, users, events } = siteData;
  const event = siteData.events.find((e) => e.slug === slug)!;
  const project = projects.find((p) => p.id === event.projectId)!;
  const owner = users.find((u) => u.id === event.ownerId)!;
  return {
    props: { event, events, project, projects, owner },
  };
};

export default EventPage;
