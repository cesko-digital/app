import { GetStaticProps } from "next";
import { siteData } from "lib/site-data";
import {
  OpportunityIndexPage,
  PageProps,
} from "components/dashboard/opportunity/overview";

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const { opportunities, projects } = siteData;
  return {
    props: {
      opportunities: opportunities.filter((o) => o.status === "live"),
      projects,
    },
  };
};

export default OpportunityIndexPage;
