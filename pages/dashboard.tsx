import type { NextPage, GetStaticProps } from "next";
import { PortalVideo } from "lib/cedu";
import { siteData } from "lib/site-data";
import { compareEventsByTime, isEventPast } from "lib/portal-type-utils";
import DashboardPage from "components/dashboard/page";
import {
  PortalEvent,
  PortalOpportunity,
  PortalProject,
} from "lib/portal-types";

interface PageProps {
  opportunities: readonly PortalOpportunity[];
  upcomingEvents: readonly PortalEvent[];
  projects: readonly PortalProject[];
  videos: readonly PortalVideo[];
}

const Dashboard: NextPage<PageProps> = (props) => <DashboardPage {...props} />;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const { projects, events, opportunities, videos } = siteData;
  const upcomingEvents = [...events]
    .filter((e) => e.status === "live")
    .filter((e) => !isEventPast(e))
    .sort(compareEventsByTime)
    .slice(0, 6);
  return {
    props: {
      upcomingEvents,
      opportunities,
      videos,
      projects,
    },
  };
};

export default Dashboard;
