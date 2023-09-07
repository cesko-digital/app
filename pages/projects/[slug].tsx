import { compareEventsByTime } from "lib/airtable/event";
import { getAllVideos } from "lib/data-sources/youtube";
import { siteData } from "lib/site-data";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { Page, Props } from "app/projects/project";

interface QueryParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const paths = siteData.projects
    .filter((p) => p.state !== "draft")
    .map((project) => ({
      params: { slug: project.slug },
    }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props, QueryParams> = async (
  context
) => {
  const { slug } = context.params!;
  const { projects, teamEngagements, events } = siteData;
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return { notFound: true };
  }
  const coordinators = project.teamEngagementIds
    .map((id) => teamEngagements.find((e) => e.id === id)!)
    .filter((e) => e !== undefined)
    .filter((e) => e.coordinatingRole);
  const opportunities = siteData.opportunities.filter(
    (o) => o.projectId === project.id && o.status === "live"
  );
  const relatedBlogPosts = siteData.blogPosts
    .filter((post) => post.tags.some((tag) => tag === project.slug))
    .slice(0, 6);
  const otherProjects = projects
    .filter((p) => p != project && p.state === "running")
    .slice(0, 3);
  const relatedEvents = events
    .filter((e) => e.projectId === project.id)
    .filter((e) => e.published)
    .sort(compareEventsByTime)
    .reverse()
    .slice(0, 3);
  const youtubeApiKey = process.env.YOUTUBE_API_KEY;
  const relatedVideos =
    youtubeApiKey && project.youTubePlaylistId
      ? await getAllVideos(youtubeApiKey, project.youTubePlaylistId)
      : [];
  return {
    props: {
      project,
      otherProjects,
      coordinators,
      relatedBlogPosts,
      opportunities,
      relatedEvents,
      relatedVideos,
    },
    // Regenerate every five minutes to refresh project info
    revalidate: 60 * 5,
  };
};

export default Page;
