import type { NextPage, GetStaticProps } from "next";
import { getAllProjects } from "lib/airtable-import";
import { PortalProject } from "lib/portal-types";

type PageProps = {
  projects: PortalProject[];
};

const Page: NextPage<PageProps> = ({ projects }) => {
  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map((p) => (
          <li>
            <ProjectLink {...p} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProjectLink: React.FC<PortalProject> = (project) => {
  const path = `/projekty/${project.slug}`;
  return <a href={path}>{project.name}</a>;
};

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const apiKey = process.env.AIRTABLE_API_KEY as string;
  return {
    props: {
      projects: await getAllProjects(apiKey),
    },
  };
};

export default Page;
