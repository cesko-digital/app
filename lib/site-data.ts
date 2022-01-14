import { getAllVideos, PortalVideo } from "./cedu";
import * as Airtable from "./airtable-import";
import * as Local from "./local-data";
import {
  PortalEvent,
  PortalOpportunity,
  PortalPartner,
  PortalProject,
  PortalUser,
} from "./portal-types";

export interface SiteData {
  projects: readonly PortalProject[];
  opportunities: readonly PortalOpportunity[];
  users: readonly PortalUser[];
  events: readonly PortalEvent[];
  partners: readonly PortalPartner[];
  videos: readonly PortalVideo[];
}

async function loadSiteData(): Promise<SiteData> {
  const forceLocal = !!process.env.DATA_SOURCE_LOCAL;
  const useLocalData = forceLocal || !Airtable.isAvailable;
  const isProductionBuild = process.env.VERCEL_ENV === "production";

  if (useLocalData && isProductionBuild) {
    console.error("Refusing to use local data source for production build.");
    process.exit(1);
  }

  if (useLocalData) {
    console.warn(
      "Loading app data from local sources, set AIRTABLE_API_KEY to load from Airtable."
    );
  } else {
    console.log(
      "Loading app data from Airtable, set DATA_SOURCE_LOCAL to use local data samples instead."
    );
  }

  const DataSource = useLocalData ? Local : Airtable;

  const projects = await DataSource.getAllProjects();
  const opportunities = (await DataSource.getAllOpportunities())
    // Filter out opportunities that point to nonexisting projects
    // (ie. projects that have been ignored because of parse errors).
    .filter((o) => projects.some((p) => p.id === o.projectId));

  return filterUndefines({
    projects,
    opportunities,
    users: await DataSource.getAllUsers(),
    events: await DataSource.getAllEvents(),
    partners: await DataSource.getAllPartners(),
    videos: await getAllVideos(),
  });
}

// This is a hack, see https://github.com/vercel/next.js/issues/11993
const filterUndefines = <T>(data: T): T => JSON.parse(JSON.stringify(data));

// TODO: Prune data to only keep relevant objects?
export const siteData = await loadSiteData();
