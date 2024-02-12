import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumbs } from "~/components/Breadcrumbs";
import { ProjectCard } from "~/components/ProjectCard";
import { getAllProjects, type Project } from "~/src/data/project";
import { Route } from "~/src/routing";
import { getRandomElem } from "~/src/utils";

export const metadata: Metadata = {
  title: "Projekty | Česko.Digital",
  description: `Velká část z toho, co se v Česko.Digital děje, se děje formou projektů.
  Podívejte se, na čem zrovna pracujeme, a kde se můžete v případě zájmu zapojit.`,
};

export const revalidate = 300;

/** Page listing all our projects */
async function Page() {
  const allProjects = await getAllProjects();
  // TBD: Filter these at DB level?
  const publishedProjects = allProjects.filter(
    (p) => p.state !== "draft" && p.state !== "internal",
  );
  const runningProjects = publishedProjects.filter(
    (p) =>
      (p.state === "running" || p.state === "incubating") &&
      !p.featureFlags.includes("internalProject"),
  );
  const internalProjects = publishedProjects.filter(
    (p) =>
      (p.state === "running" || p.state === "incubating") &&
      p.featureFlags.includes("internalProject"),
  );
  const finishedProjects = publishedProjects.filter(
    (p) => p.state === "finished",
  );
  const highlightedProjects = publishedProjects.filter((p) => p.highlighted);
  const featuredProject =
    highlightedProjects.length > 0 ? getRandomElem(highlightedProjects) : null;

  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs
        path={[{ label: "Homepage", path: "/" }]}
        currentPage="Projekty"
      />

      <h1 className="typo-title mb-10 mt-7">Projekty</h1>
      <p className="mb-10 max-w-prose">{metadata.description}</p>

      {featuredProject && <FeaturedProjectBox project={featuredProject} />}

      <h2 className="typo-title2 mb-4">Aktuální projekty</h2>
      <div className="mb-20 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {runningProjects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      <h2 className="typo-title2 mb-4">Interní projekty</h2>
      <div className="mb-20 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {internalProjects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      <h2 className="typo-title2 mb-4">Dokončené projekty</h2>
      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
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
    <div className="relative overflow-clip rounded-xl">
      <Image
        src={project.coverImageUrl}
        className="absolute h-full w-full object-cover grayscale"
        alt=""
        fill
      />
      <div className="to-[rgba(71, 71, 91, 0.5)] absolute h-full w-full bg-gradient-to-r from-asphalt from-30%"></div>
      <div className="relative flex flex-col gap-7 p-7 text-white md:p-20">
        <Image
          src={project.logoUrl}
          width={80}
          height={80}
          className="rounded-full bg-gray"
          alt=""
        />
        <h3 className="typo-title2">{project.name}</h3>
        <p className="max-w-prose">{project.tagline}</p>
        <div>
          <Link
            href={Route.toProject(project)}
            className="btn-inverted inline-block"
          >
            Detail projektu
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Page;
