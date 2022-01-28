import { PortalOpportunity, PortalProject, PortalUser } from "./portal-types";
import { MarkdownString } from "./utils";

export function renderOpportunity(
  opportunity: Pick<PortalOpportunity, "name" | "slug">,
  project: Pick<PortalProject, "name">,
  owner: Pick<PortalUser, "name" | "email">
): MarkdownString {
  const linkTo = (o: typeof opportunity) =>
    `https://cesko.digital/opportunities/${o.slug}`;
  return {
    source: `**[${opportunity.name}](${linkTo(opportunity)})** pro projekt ${
      project.name
    }, kontaktní osoba [${owner.name}](mailto:${owner.email})`,
  };
}

export function renderList<T>(
  items: readonly T[],
  renderItem: (item: T) => MarkdownString
): MarkdownString {
  return {
    source: items
      .map(renderItem)
      .map((item) => `* ${item.source}`)
      .join("\n"),
  };
}

export function renderOpportunities(
  ops: readonly PortalOpportunity[],
  projects: readonly PortalProject[],
  users: readonly PortalUser[]
): MarkdownString {
  const projectFor = (o: PortalOpportunity) =>
    projects.find((p) => o.projectId === p.id)!;
  const userFor = (o: PortalOpportunity) =>
    users.find((u) => o.ownerId === u.id)!;
  const renderItem = (o: PortalOpportunity) =>
    renderOpportunity(o, projectFor(o), userFor(o));
  return renderList(ops, renderItem);
}
