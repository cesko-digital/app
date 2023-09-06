import { GetStaticProps } from "next";
import { siteData } from "lib/site-data";
import { Page, Props } from "app/projects/_page";

export const getStaticProps: GetStaticProps<Props> = async () => {
  const projects = siteData.projects.filter(
    (p) => p.state !== "draft" && p.state !== "internal"
  );
  return {
    props: { projects },
    // Regenerate every five minutes to refresh project info
    revalidate: 60 * 5,
  };
};

export default Page;
