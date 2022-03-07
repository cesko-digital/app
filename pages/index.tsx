import type { NextPage, GetStaticProps } from "next";
import { PortalPartner, PortalProject } from "lib/portal-types";
import { siteData } from "lib/site-data";
import { shuffleInPlace } from "lib/utils";
import HomePage from "components/home";
import { useRouter } from "next/router";

type PageProps = {
  featuredProjects: readonly PortalProject[];
  partners: readonly PortalPartner[];
};

const Page: NextPage<PageProps> = ({ featuredProjects, partners }) => {
  const router = useRouter();
  const displayBanner = !!router.query.banner;
  return (
    <HomePage
      featuredProjects={featuredProjects}
      partners={partners}
      displayDonationBanner={displayBanner}
    />
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
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
  };
};

export default Page;
