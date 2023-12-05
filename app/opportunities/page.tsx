import { Breadcrumbs } from "components/Breadcrumbs";
import { OpportunityRow } from "components/OpportunityRow";
import { getAllOpportunities, type Opportunity } from "src/data/opportunity";
import { getAllProjects } from "src/data/project";

/** Page listing all wanted roles on projects */
async function Page() {
  const opportunities = await getAllOpportunities("Show to Users");
  const projects = await getAllProjects();
  const projectForRole = (role: Opportunity) =>
    projects.find((p) => p.id === role.projectId)!;
  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs
        path={[{ label: "Homepage", path: "/" }]}
        currentPage="Hledané role"
      />
      <h1 className="typo-title mb-10 mt-7">
        Hledané role{" "}
        <span className="aspect-square rounded-full bg-gray p-2 font-normal">
          {opportunities.length}
        </span>
      </h1>
      {opportunities.map((o) => (
        <OpportunityRow key={o.id} role={o} project={projectForRole(o)} />
      ))}
    </main>
  );
}

export default Page;
