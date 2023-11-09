import { Breadcrumbs } from "components/Breadcrumbs";
import { ProjectCard } from "components/ProjectCard";
import Image from "next/image";
import Link from "next/link";
import { Project, getAllProjects } from "src/data/project";
import { Route } from "src/routing";
import { getRandomElem, loremIpsum } from "src/utils";

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
  const highlightedProjects = publishedProjects.filter((p) => p.highlighted);
  const featuredProject =
    highlightedProjects.length > 0 ? getRandomElem(highlightedProjects) : null;

  return (
    <main className="py-20 px-7 max-w-content m-auto">
      <Breadcrumbs
        path={[{ label: "Homepage", path: "/" }]}
        currentPage="Projekty"
      />

      <h1 className="typo-title mt-7 mb-10">Projekty</h1>
      <p className="max-w-prose mb-10">{loremIpsum}</p>

      {featuredProject && <FeaturedProjectBox project={featuredProject} />}

      <h2 className="typo-title2 mb-4">Aktuální projekty</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mb-20">
        {runningProjects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      <h2 className="typo-title2 mb-4">Dokončené projekty</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        {finishedProjects.map((p) => (
          <ProjectCard key={p.id} project={p} fade={true} />
        ))}
      </div>
    </main>
  );
}

const FeaturedProjectBox = ({ project }: { project: Project }) => (
  <div className="mb-20">
    <h2 className="typo-title2 mb-4">Vybíráme</h2>
    <div className="aspect-[2.3] relative rounded-xl overflow-clip">
      <Image
        src={project.coverImageUrl}
        className="object-cover absolute grayscale"
        alt=""
        fill
      />
      <div className="absolute w-full h-full bg-gradient-to-r from-asphalt from-30% to-[rgba(71, 71, 91, 0.5)]"></div>
      <div className="p-20 absolute text-white flex flex-col gap-7">
        <Image
          src={project.logoUrl}
          width={80}
          height={80}
          className="bg-gray rounded-full"
          alt=""
        />
        <h3 className="typo-title2">{project.name}</h3>
        <p className="max-w-prose">{project.tagline}</p>
        <div>
          <Link
            href={Route.toProject(project)}
            className="inline-block btn-inverted"
          >
            Detail projektu
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Page;
