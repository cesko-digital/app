import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { siteData } from "lib/site-data";
import { compareEventsByTime } from "lib/portal-type-utils";
import { ProjectPage, PageProps } from "components/projects/detail";

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
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps, QueryParams> = async (
  context
) => {
  const { slug } = context.params!;
  const { projects, users, events } = siteData;
  const project = projects.find((p) => p.slug === slug)!;
  const coordinators = project.coordinatorIds.map(
    (id) => users.find((user) => user.id === id)!
  );
  const opportunities = siteData.opportunities.filter(
    (o) => o.projectId === project.id && o.status === "live"
  );
  const relatedBlogPosts = siteData.blogPosts
    .filter((post) => post.tags.some((tag) => tag === project.slug))
    .reverse()
    .slice(0, 3);
  const otherProjects = projects
    .filter((p) => p != project && p.state === "running")
    .slice(0, 3);
  const relatedEvents = events
    .filter((e) => e.projectId === project.id)
    .sort(compareEventsByTime)
    .reverse()
    .slice(0, 3);
  return {
    props: {
      project,
      otherProjects,
      coordinators,
      relatedBlogPosts,
      opportunities,
      relatedEvents,
    },
  };
};

export default ProjectPage;
