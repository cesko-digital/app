import { NextPage, GetStaticProps } from "next";
import { PortalProject } from "lib/portal-types";
import { siteData } from "lib/site-data";
import { shuffleInPlace } from "lib/utils";
import { HomePage, PageProps } from "components/home";
import { useRouter } from "next/router";

type StaticPageProps = Omit<PageProps, "displayDonationBanner">;

const Page: NextPage<StaticPageProps> = ({ featuredProjects, partners }) => {
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

export const getStaticProps: GetStaticProps<StaticPageProps> = async () => {
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
