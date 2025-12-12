import { type Metadata } from "next";

import { Breadcrumbs } from "~/components/Breadcrumbs";
import { OpportunityRow } from "~/components/OpportunityRow";
import { getAllOpportunities, type Opportunity } from "~/src/data/opportunity";
import { getAllProjects } from "~/src/data/project";
import { strip } from "~/src/utils";

import { NotificationPrefs } from "./NotificationPrefs";

/** Refresh data every 10 minutes */
export const revalidate = 600;

export const metadata: Metadata = {
  title: "Hledané role | Česko.Digital",
  description: strip`Tady najdeš seznam konkrétních rolí nebo úkolů,
    se kterými potřebujeme pomoc v našich projektech. Bývají hodně
    různorodé – jednorázové, kratší i dlouhodobé, placené i dobrovolnické,
    více i méně kvalifikované.`,
};

/** Page listing all wanted roles on projects */
async function Page() {
  const opportunities = await getAllOpportunities("Show to Users");
  const projects = await getAllProjects();
  const projectForRole = (role: Opportunity) =>
    projects.find((p) => p.id === role.projectId)!;
  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs currentPage="Hledané role" />
      <h1 className="typo-title mb-10 mt-7">Hledané role</h1>
      <p className="mb-4 max-w-prose">{metadata.description}</p>
      <NotificationPrefs />
      {opportunities.map((o) => (
        <OpportunityRow key={o.id} role={o} project={projectForRole(o)} />
      ))}
    </main>
  );
}

export default Page;
