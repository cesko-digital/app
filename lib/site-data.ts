import { getAllVideos, PortalVideo } from "./cedu";
import { Article, getArticleIndex } from "./related-blog-posts";
import { env } from "./env";
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
  blogPosts: readonly Article[];
}

async function loadSiteData(): Promise<SiteData> {
  if (env.useLocalData) {
    console.warn(
      "Loading app data from local sources, set AIRTABLE_API_KEY to load from Airtable."
    );
  } else {
    console.log(
      "Loading app data from Airtable, set DATA_SOURCE_LOCAL to use local data samples instead."
    );
  }

  const DataSource = env.useLocalData ? Local : Airtable;

  let projects = await DataSource.getAllProjects();
  let users = await DataSource.getAllUsers();
  let opportunities = await DataSource.getAllOpportunities();
  let events = await DataSource.getAllEvents();

  // Filter out draft data
  if (!env.includeDraftData) {
    projects = projects.filter((p) => p.state !== "draft");
    opportunities = opportunities.filter((o) => o.status !== "draft");
    events = events.filter((e) => e.status !== "draft");
  }

  // Filter out objects with dangling references
  opportunities = opportunities.filter((o) =>
    projects.some((p) => p.id === o.projectId)
  );
  events = events.filter(
    (e) =>
      users.some((u) => u.id === e.ownerId) &&
      projects.some((p) => p.id === e.projectId)
  );

  return filterUndefines({
    partners: await DataSource.getAllPartners(),
    videos: await getAllVideos(),
    blogPosts: await getArticleIndex(),
    projects,
    opportunities,
    users,
    events,
  });
}

// This is a hack, see https://github.com/vercel/next.js/issues/11993
const filterUndefines = <T>(data: T): T => JSON.parse(JSON.stringify(data));

// TODO: Prune data to only keep relevant objects?
export const siteData = await loadSiteData();
