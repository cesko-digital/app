import fs from "fs";
import { PortalEvent } from "lib/airtable/event";
import { PortalOpportunity } from "lib/airtable/opportunity";
import { PortalPartner } from "lib/airtable/partner";
import { PortalProject } from "lib/airtable/project";
import { TeamEngagement } from "lib/airtable/team-engagement";
import { PortalUser } from "lib/airtable/user";
import { YTPlaylistItem } from "./youtube";
import { MarketPlaceOffer } from "lib/airtable/market-place";

// The weird signature is here to make the data source type-compatible with the Airtable data source
function loader<T>(file: string): () => Promise<T[]> {
  return () => {
    const path = "content/samples/" + file;
    const contents = fs.readFileSync(path, { encoding: "utf-8" });
    const data = JSON.parse(contents);
    return Promise.resolve(data);
  };
}

export const getAllProjects = loader<PortalProject>("projects.json");
export const getAllUsers = loader<PortalUser>("users.json");
export const getAllEvents = loader<PortalEvent>("events.json");
export const getAllPartners = loader<PortalPartner>("partners.json");
export const getAllOpportunities =
  loader<PortalOpportunity>("opportunities.json");
export const getAllVideos = loader<YTPlaylistItem>("videos.json");
export const getAllTeamEngagements = loader<TeamEngagement>("engagements.json");
export const getAllMarketPlaceOffers = loader<MarketPlaceOffer>(
  "marketplaceoffers.json"
);
