import { GetStaticProps } from "next";
import { siteData } from "lib/site-data";
import { EventOverviewPage, PageProps } from "components/events/overview";

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  return {
    props: {
      events: siteData.events,
    },
  };
};

export default EventOverviewPage;
