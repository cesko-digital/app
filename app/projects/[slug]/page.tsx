import Markdoc from "@markdoc/markdoc";
import { Breadcrumbs } from "components/Breadcrumbs";
import { allCustomTags } from "components/MarkdocTags";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { Project, findProjectBySlug } from "src/data/project";
import { clsx } from "clsx";
import {
  TeamEngagement,
  getTeamEngagementsForProject,
} from "src/data/team-engagement";
import { projectDescriptionConfig } from "src/markdoc/schema";
import { Route } from "src/routing";

type Params = {
  slug: string;
};

export type Props = {
  params: Params;
};

async function Page({ params }: Props) {
  const project = await findProjectBySlug(params.slug);
  if (!project) {
    notFound();
  }

  const allTeamEngagements = await getTeamEngagementsForProject(project.slug);
  const coordinators = allTeamEngagements
    // Only take coordinators
    .filter((e) => e.coordinatingRole)
    // Sort inactive engagements last
    .sort((a, b) => {
      if (a.inactive && !b.inactive) {
        return +1;
      } else if (b.inactive && !a.inactive) {
        return -1;
      } else {
        return 0;
      }
    });

  return (
    <main className="py-20 px-7 max-w-content m-auto">
      <Breadcrumbs
        path={[
          { label: "Homepage", path: "/" },
          { label: "Projekty", path: Route.projects },
        ]}
        currentPage={project.name}
      />

      <h1 className="typo-title mt-7 mb-2">{project.name}</h1>
      <h2 className="typo-subtitle mb-10">{project.tagline}</h2>
      <div className="aspect-[2.3] relative mb-10">
        <Image
          src={project.coverImageUrl}
          className="object-cover"
          alt=""
          fill
        />
      </div>

      <div className="grid grid-cols-3 gap-7">
        <section className="col-span-2">
          <h2 className="typo-title2">O projektu</h2>
          <ProjectDescription project={project} />
        </section>
        <aside>
          <Sidebar coordinators={coordinators} />
        </aside>
      </div>
    </main>
  );
}

const ProjectDescription = ({ project }: { project: Project }) => {
  const syntaxTree = Markdoc.parse(project.description.source);
  const renderableNode = Markdoc.transform(
    syntaxTree,
    projectDescriptionConfig
  );
  const renderedContent = Markdoc.renderers.react(renderableNode, React, {
    components: allCustomTags,
  });
  return <div className="embedded-markdown max-w-prose">{renderedContent}</div>;
};

const Sidebar = ({ coordinators }: { coordinators: TeamEngagement[] }) => (
  <div className="bg-pebble rounded-xl p-7">
    <h2 className="typo-title3 mb-4">Koordinátoři a koordinátorky</h2>
    {coordinators.map((c) => (
      <div
        key={c.id}
        className={clsx(
          "flex flex-row gap-4 items-center mb-2",
          c.inactive && "opacity-50"
        )}
      >
        {/* TBD: Fix non-square avatars, https://app.cesko.digital/projects/digitalni-inkluze */}
        <Image
          src={c.userAvatarUrl}
          className="rounded-full"
          width={60}
          height={60}
          alt=""
        />
        <span>{c.userName}</span>
      </div>
    ))}
  </div>
);

export default Page;
