import { PortalProject } from "./airtable/project";
import { PortalUser } from "./airtable/user";
import { PortalOpportunity } from "./portal-types";
import { MarkdownString } from "./utils";

export function renderOpportunity(
  opportunity: Pick<PortalOpportunity, "name" | "slug">,
  project: Pick<PortalProject, "name">,
  owner: Pick<PortalUser, "name" | "email">
): MarkdownString {
  const linkTo = (o: typeof opportunity) =>
    `https://cesko.digital/opportunities/${o.slug}?utm_medium=newsletter`;
  return {
    source: `**[${opportunity.name}](${linkTo(opportunity)})** pro projekt ${
      project.name
    }, kontaktní osoba [${owner.name}](mailto:${
      owner.email
    }?subject=${encodeURIComponent(opportunity.name)})`,
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

export function renderOpportunitiesBySkill(
  ops: readonly PortalOpportunity[],
  projects: readonly PortalProject[],
  users: readonly PortalUser[]
): MarkdownString {
  let allSkills = unique(ops.flatMap((o) => o.skills));
  allSkills = allSkills.filter((s) => s !== "Other");
  allSkills.push("Other");

  const opportunitiesWithSkill = (skill: string) =>
    ops.filter((o) => o.skills.some((s) => s === skill));
  let result = "";
  for (const skill of allSkills) {
    const relevantOps = opportunitiesWithSkill(skill);
    if (relevantOps.length > 0) {
      const heading = skill === "Other" ? "Ostatní" : skill;
      result += `## ${heading}\n\n`;
      result += renderOpportunities(relevantOps, projects, users).source;
      result += "\n\n";
    }
  }

  return { source: result };
}

const unique = <T>(a: T[]) => [...new Set(a)];
