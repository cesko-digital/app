import { Breadcrumbs } from "components/Breadcrumbs";
import { OpportunityRow } from "components/OpportunityRow";
import { Opportunity, getAllOpportunities } from "src/data/opportunity";
import { getAllProjects } from "src/data/project";

/** Page listing all wanted roles on projects */
async function Page() {
  const opportunities = await getAllOpportunities("Show to Users");
  const projects = await getAllProjects();
  const projectForRole = (role: Opportunity) =>
    projects.find((p) => p.id === role.projectId)!;
  return (
    <main className="py-20 px-7 max-w-content m-auto">
      <Breadcrumbs
        path={[{ label: "Homepage", path: "/" }]}
        currentPage="Hledané role"
      />
      <h1 className="typo-title mt-7 mb-10">
        Hledané role{" "}
        <span className="aspect-square bg-gray rounded-full p-2 font-normal">
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
