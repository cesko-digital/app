import { getAllVideos, PortalVideo } from "./cedu";
import * as Local from "./local-data";
import * as Airtable from "./airtable-import";
import {
  PortalEvent,
  PortalOpportunity,
  PortalPartner,
  PortalProject,
  PortalUser,
} from "./portal-types";

/**
 * An abstraction over different data sources that we may have
 *
 * Data consumers should know nothing about Airtable or other data sources.
 */
export interface DataSource {
  getAllProjects: () => Promise<PortalProject[]>;
  getAllOpportunities: () => Promise<PortalOpportunity[]>;
  getAllUsers: () => Promise<PortalUser[]>;
  getAllEvents: () => Promise<PortalEvent[]>;
  getAllPartners: () => Promise<PortalPartner[]>;
  getAllVideos: () => Promise<PortalVideo[]>;
}

/** Main data source that reads data from Airtable (mostly everything) and local filesystem (videos) */
const mainDataSource: DataSource = {
  getAllProjects: Airtable.getAllProjects,
  getAllOpportunities: Airtable.getAllOpportunities,
  getAllUsers: Airtable.getAllUsers,
  getAllEvents: Airtable.getAllEvents,
  getAllPartners: Airtable.getAllPartners,
  getAllVideos,
};

/** Local data source that uses sample data and doesn’t need any API keys */
const localDataSource: DataSource = {
  getAllProjects: Local.getAllProjects,
  getAllOpportunities: Local.getAllOpportunities,
  getAllUsers: Local.getAllUsers,
  getAllEvents: Local.getAllEvents,
  getAllPartners: Local.getAllPartners,
  getAllVideos,
};

/**
 * Pick a suitable data source
 *
 * We prefer to use the production Airtable data source. If that’s not available,
 * the local data source will be used instead (you can also force it by setting the
 * `DATA_SOURCE_LOCAL` env variable). Either way, we make sure not to use the local
 * data source when running a production build.
 */
function pickDataSource(): DataSource {
  const isProduction = process.env.VERCEL_ENV === "production";
  const forceLocal = process.env.DATA_SOURCE_LOCAL;
  if (forceLocal) {
    // User explicitly requested local data source
    if (isProduction) {
      console.error("Refusing to use local data source for production build.");
      process.exit(1);
    }
    console.warn("Using local data source as requested.");
    return localDataSource;
  } else if (Airtable.isAvailable) {
    // Data source not set explicitly, Airtable available
    console.log("Using Airtable as the data source.");
    return mainDataSource;
  } else {
    // Airtable not available, use local data source if possible
    if (isProduction) {
      console.error(
        "We’re running a production build and Airtable is not available."
      );
      process.exit(1);
    }
    console.warn("Airtable not available, using the local data source.");
    console.warn("Set AIRTABLE_API_KEY in .env.local to use Airtable instead.");
    return localDataSource;
  }
}

export const dataSource = pickDataSource();
