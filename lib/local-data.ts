import fs from "fs";
import {
  PortalEvent,
  PortalOpportunity,
  PortalPartner,
  PortalProject,
  PortalUser,
} from "./portal-types";

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
