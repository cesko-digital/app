import { GetStaticProps } from "next";
import { siteData } from "lib/site-data";
import { compareEventsByTime, isEventPast } from "lib/portal-type-utils";
import { DashboardPage, PageProps } from "components/dashboard/page";

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

export default DashboardPage;
