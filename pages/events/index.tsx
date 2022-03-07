import { NextPage, GetStaticProps } from "next";
import { PortalEvent } from "lib/portal-types";
import { siteData } from "lib/site-data";
import EventOverviewPage from "components/event/overview";

type PageProps = {
  events: readonly PortalEvent[];
};

const Page: NextPage<PageProps> = ({ events }) => {
  return <EventOverviewPage events={events} />;
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  return {
    props: {
      events: siteData.events,
    },
  };
};

export default Page;
