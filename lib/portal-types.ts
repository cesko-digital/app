export type MarkdownString = {
  source: string;
};

export interface PortalProject {
  id: string;

  name: string;
  slug: string;
  tagline: string;
  description: string;
  url: string;

  contributeText?: string;

  coverImageUrl: string;
  logoUrl: string;

  highlighted: boolean;
  finished: boolean;
  draft: boolean;
  silent: boolean;

  tagIds: string[];
  coordinatorIds: string[];

  trelloUrl?: string;
  githubUrl?: string;
  slackChannelUrl?: string;
  slackChannelName?: string;
}

export interface PortalUser {
  id: string;
  name: string;
  profilePictureUrl: string;
}

export interface PortalEvent {
  id: string;
  name: string;
  slug: string;
  summary: string;
  description: MarkdownString;
  startTime: Date;
  ownerId: string;
  projectId: string;
  status: "draft" | "live" | "unlisted";
  registrationUrl: string;
  registrationTitle: string;

  endTime?: Date;
  tagIds: string[];
  coverImageUrl?: string;

  locationTitle?: string;
  locationUrl?: string;
}

export interface PortalOpportunity {
  id: string;
  name: string;
  slug: string;
  projectId: string;
  summary: MarkdownString;
  timeRequirements: string;
  ownerId: string;
  contactUrl: string;
  coverImageUrl?: string;
  skills: string[];
  juniorFriendly: boolean;
  status: "draft" | "live" | "unlisted";
}

export interface PortalPartner {
  id: string;
  name: string;
  logoUrl: string;
  linkUrl?: string;
  categories: (
    | "homepage"
    | "financial.main"
    | "financial.grants"
    | "financial.regular"
    | "experts.submitters"
    | "experts.supporters"
  )[];
}

export function filterPartnersByCategory(
  partners: PortalPartner[],
  category: ArrayElement<PortalPartner["categories"]>
) {
  return partners.filter((p) => p.categories.some((c) => c === category));
}

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
