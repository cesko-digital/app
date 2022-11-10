import { Article, getArticleIndex } from "./data-sources/blog";
import { enableAPMLogging } from "./apm";
import { getAllUsers, PortalUser } from "./airtable/user";
import { getAllProjects, PortalProject } from "./airtable/project";
import { getAllEvents, PortalEvent } from "./airtable/event";
import { getAllOpportunities, PortalOpportunity } from "./airtable/opportunity";
import { getAllPartners, PortalPartner } from "./airtable/partner";
import { getAllVideos, YTPlaylistItem } from "./data-sources/youtube";
import * as Local from "./data-sources/dummy";
import apm from "elastic-apm-node";
import {
  getAllTeamEngagements,
  TeamEngagement,
} from "./airtable/team-engagement";
import {
  getPublishedMarketPlaceOffers,
  MarketPlaceOffer,
} from "./airtable/market-place";

enableAPMLogging();

export interface SiteData {
  projects: readonly PortalProject[];
  opportunities: readonly PortalOpportunity[];
  users: readonly PortalUser[];
  events: readonly PortalEvent[];
  partners: readonly PortalPartner[];
  videos: readonly YTPlaylistItem[];
  blogPosts: readonly Article[];
  teamEngagements: TeamEngagement[];
  marketPlaceOffers: readonly MarketPlaceOffer[];
}

type Async<T> = () => Promise<T>;

interface DataSource {
  projects: Async<PortalProject[]>;
  opportunities: Async<PortalOpportunity[]>;
  users: Async<PortalUser[]>;
  events: Async<PortalEvent[]>;
  partners: Async<PortalPartner[]>;
  videos: Async<YTPlaylistItem[]>;
  blogPosts: Async<Article[]>;
  teamEngagements: Async<TeamEngagement[]>;
  marketPlaceOffers: Async<MarketPlaceOffer[]>;
}

const ProductionDataSource: DataSource = {
  projects: getAllProjects,
  opportunities: getAllOpportunities,
  users: getAllUsers,
  events: getAllEvents,
  partners: getAllPartners,
  videos: getAllVideos,
  blogPosts: getArticleIndex,
  teamEngagements: getAllTeamEngagements,
  marketPlaceOffers: getPublishedMarketPlaceOffers,
};

const SampleDataSource: DataSource = {
  projects: Local.getAllProjects,
  opportunities: Local.getAllOpportunities,
  users: Local.getAllUsers,
  events: Local.getAllEvents,
  partners: Local.getAllPartners,
  videos: Local.getAllVideos,
  blogPosts: getArticleIndex, // TODO
  teamEngagements: Local.getAllTeamEngagements,
  marketPlaceOffers: Local.getAllMarketPlaceOffers,
};

async function loadSiteData(): Promise<SiteData> {
  const forceLocal = !!process.env.DATA_SOURCE_LOCAL;
  const haveAirtable = !!process.env.AIRTABLE_API_KEY;
  const useLocalData = forceLocal || !haveAirtable;
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
      "Loading app data from live sources, set DATA_SOURCE_LOCAL to use local data samples instead."
    );
  }

  const dataSource = useLocalData ? SampleDataSource : ProductionDataSource;
  const transactionTag = useLocalData
    ? "load_sample_data"
    : "load_production_data";

  apm.startTransaction(transactionTag);

  let [
    projects,
    opportunities,
    users,
    events,
    partners,
    videos,
    blogPosts,
    teamEngagements,
    marketPlaceOffers,
  ] = await Promise.all([
    dataSource.projects(),
    dataSource.opportunities(),
    dataSource.users(),
    dataSource.events(),
    dataSource.partners(),
    dataSource.videos(),
    dataSource.blogPosts(),
    dataSource.teamEngagements(),
    dataSource.marketPlaceOffers(),
  ]);

  apm.endTransaction();

  // Filter out opportunities that point to nonexisting projects
  // (ie. projects that have been ignored because of parse errors).
  opportunities = opportunities.filter((o) =>
    projects.some((p) => p.id === o.projectId)
  );
  // Filter out events that are owned by nonexisting users
  events = events.filter((e) => users.some((u) => u.id === e.ownerId));

  return filterUndefines({
    partners,
    videos,
    blogPosts,
    projects,
    opportunities,
    users,
    events,
    teamEngagements,
    marketPlaceOffers,
  });
}

// This is a hack, see https://github.com/vercel/next.js/issues/11993
const filterUndefines = <T>(data: T): T => JSON.parse(JSON.stringify(data));

// TODO: Prune data to only keep relevant objects?
export const siteData = await loadSiteData();
