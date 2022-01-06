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
  getAllPartners: () =>
    Promise.resolve([
      /*TODO*/
    ]),
  getAllVideos,
};

export const dataSource = mainDataSource;
