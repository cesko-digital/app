import {
  PortalEvent,
  PortalOpportunity,
  PortalProject,
  PortalUser,
} from "./portal-types";

// TODO: All the parsing here is VERY simplistic. We should do null checks
// at the very least, but type assertions would be even nicer to make sure
// the type signatures hold.

export type AirtableRecord = Record<string, any>;

export function parsePortalUser(data: AirtableRecord): PortalUser {
  const f = data.fields;
  return {
    id: data.id,
    name: f.name,
    email: f.email,
    profilePictureUrl: f.profilePictureUrl,
  };
}

export function parsePortalProject(data: AirtableRecord): PortalProject {
  const f = data.fields;
  return {
    id: data.id,
    name: f.csName,
    slug: f.csSlug,
    tagline: f.csTagline,
    description: f.csDescription,
    url: f.url,
    contributeText: f.csContributeText,
    coverImageUrl: f.coverUrl,
    logoUrl: f.logoUrl,
    highlighted: f.highlighted || false,
    finished: f.finished || false,
    draft: f.draft || false,
    tagIds: f.tags || [],
    coordinatorIds: f.coordinators || [],
    slackChannelUrl: f.slackChannelUrl,
    slackChannelName: f.slackChannelName,
  };
}

export function parsePortalEvent(data: AirtableRecord): PortalEvent {
  const f = data.fields;
  return {
    id: data.id,
    name: f.Name,
    summary: f.Summary,
    description: { source: f.Description },
    startTime: new Date(f["Start Time"]),
    ownerId: f.Owner[0],
    projectId: f.Project[0],
    status: f.Status,
    registrationUrl: f["RSVP URL"],
    registrationTitle: f["RSVP Title"],
    customSlug: f.Slug,
    endTime: new Date(f["End Time"]),
    tagIds: f.Tags,
    coverImageUrl: f["Cover URL"],
    locationTitle: f["Location Title"],
    locationUrl: f["Location URL"],
  };
}

export function parsePortalOpportunity(
  data: AirtableRecord
): PortalOpportunity {
  const f = data.fields;
  return {
    id: data.id,
    name: f.Name,
    projectId: f.Project[0],
    summary: { source: f.Summary },
    timeRequirements: f["Time Requirements"],
    ownerId: f.Owner[0],
    contactUrl: f["RSVP URL"],
    coverImageUrl: f["Cover URL"],
    skills: f.Skills,
    juniorFriendly: f["Junior Friendly"] || false,
    status: f.Status,
  };
}
