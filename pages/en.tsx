import { GetStaticProps } from "next";
import { siteData } from "lib/site-data";
import { EnglishHomePage, PageProps } from "components/home/english";

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const homepagePartners = siteData.partners.filter((p) =>
    p.categories.some((c) => c === "homepage")
  );
  return {
    props: {
      partners: homepagePartners,
    },
  };
};

export default EnglishHomePage;
