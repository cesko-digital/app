import { GetStaticProps } from "next";
import { siteData } from "lib/site-data";
import { shuffleInPlace } from "lib/utils";
import { Page, Props } from "app/home/_page";
import { PortalProject } from "lib/airtable/project";

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allPartners = siteData.partners;
  const partners = allPartners.filter((p) =>
    p.categories.some((c) => c === "homepage")
  );
  const canBeFeatured = (p: PortalProject) =>
    p.state === "finished" || p.state === "incubating" || p.state === "running";
  const featuredProjects = shuffleInPlace(
    siteData.projects.filter(canBeFeatured)
  ).slice(0, 3);
  return {
    props: {
      featuredProjects,
      partners,
    },
    // regenerate once an hour, mostly to just pick a new set of featured projects
    revalidate: 60 * 60,
  };
};

export default Page;
