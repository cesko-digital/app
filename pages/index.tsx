import type { NextPage, GetStaticProps } from "next";
import { getAllProjects } from "../lib/airtable-import";
import { PortalProject } from "../lib/portal-types";

type PageProps = {
  projects: PortalProject[];
};

const Home: NextPage<PageProps> = ({ projects }) => {
  return (
    <div>
      <h1>Česko.Digital</h1>
      <ul>
        <li>
          <a href="/projekty">Projects ({projects.length})</a>
        </li>
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const apiKey = process.env.AIRTABLE_API_KEY as string;
  return {
    props: {
      projects: await getAllProjects(apiKey),
    },
  };
};

export default Home;
