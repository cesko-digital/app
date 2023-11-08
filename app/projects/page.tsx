import { ProjectCard } from "components/ProjectCard";
import { getAllProjects } from "src/data/project";
import { loremIpsum } from "src/utils";

async function Page() {
  const allProjects = await getAllProjects();
  // TBD: Filter these at DB level?
  const publishedProjects = allProjects.filter(
    (p) => p.state !== "draft" && p.state !== "internal"
  );
  const runningProjects = publishedProjects.filter(
    (p) => p.state === "running" || p.state === "incubating"
  );
  const finishedProjects = publishedProjects.filter(
    (p) => p.state === "finished"
  );
  return (
    <main className="py-20 px-7 max-w-content m-auto">
      <h1 className="typo-title mb-10">Projekty</h1>
      <p className="max-w-prose mb-10">{loremIpsum}</p>

      <h2 className="typo-title2 mb-4">Aktuální projekty</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mb-20">
        {runningProjects.map(ProjectCard)}
      </div>

      <h2 className="typo-title2 mb-4">Dokončené projekty</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        {finishedProjects.map(ProjectCard)}
      </div>
    </main>
  );
}

export default Page;
