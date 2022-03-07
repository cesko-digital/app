import { NextPage, GetStaticProps } from "next";
import { PortalPartner } from "lib/portal-types";
import { siteData } from "lib/site-data";
import EnglishHomePage from "components/home/english";

type PageProps = {
  partners: PortalPartner[];
};

const Page: NextPage<PageProps> = ({ partners }) => {
  return <EnglishHomePage partners={partners} />;
};

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

export default Page;
