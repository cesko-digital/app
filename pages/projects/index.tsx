import { GetStaticProps } from "next";
import { siteData } from "lib/site-data";
import { ProjectOverviewPage, PageProps } from "components/projects/overview";

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const projects = siteData.projects.filter(
    (p) => p.state !== "draft" && p.state !== "internal"
  );
  return {
    props: { projects },
  };
};

export default ProjectOverviewPage;
