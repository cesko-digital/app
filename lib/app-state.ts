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

export interface AppState {
  projects: PortalProject[];
  opportunities: PortalOpportunity[];
  users: PortalUser[];
  events: PortalEvent[];
  partners: PortalPartner[];
  videos: PortalVideo[];
}

async function loadAppState(): Promise<AppState> {
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

  return {
    projects: await DataSource.getAllProjects(),
    opportunities: await DataSource.getAllOpportunities(),
    users: await DataSource.getAllUsers(),
    events: await DataSource.getAllEvents(),
    partners: await DataSource.getAllPartners(),
    videos: await getAllVideos(),
  };
}

// TODO: Prune data to only keep relevant objects?
export const appState = await loadAppState();
