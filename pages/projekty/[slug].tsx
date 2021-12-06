import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { getAllProjects } from "../../lib/airtable-import";
import { PortalProject } from "../../lib/portal-types";

type PageProps = {
  project: PortalProject;
};

const ProjectPage: NextPage<PageProps> = ({ project }) => {
  return (
    <div>
      <h1>{project.name}</h1>
      <h2>{project.tagline}</h2>
      <p>{project.description}</p>
    </div>
  );
};

// TODO: Can we type this tighter?
export const getStaticPaths: GetStaticPaths = async () => {
  const apiKey = process.env.AIRTABLE_API_KEY as string;
  const projects = await getAllProjects(apiKey);
  const paths = projects.map((project) => ({
    params: { slug: project.slug },
  }));
  return {
    paths,
    fallback: false,
  };
};

// TODO: Can we type this tighter?
export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const apiKey = process.env.AIRTABLE_API_KEY as string;
  const projects = await getAllProjects(apiKey);
  const project = projects.find((p) => p.slug === params!.slug)!;
  return {
    props: {
      project,
    },
    revalidate: 1,
  };
};

export default ProjectPage;
