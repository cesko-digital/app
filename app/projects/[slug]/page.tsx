import Markdoc from "@markdoc/markdoc";
import { Breadcrumbs } from "components/Breadcrumbs";
import { allCustomTags } from "components/MarkdocTags";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { Project, getAllProjects } from "src/data/project";
import { projectDescriptionConfig } from "src/markdoc/schema";
import { Route } from "src/routing";

type Params = {
  slug: string;
};

export type Props = {
  params: Params;
};

async function Page({ params }: Props) {
  const allProjects = await getAllProjects();
  const project = allProjects.find((p) => p.slug === params.slug) || notFound();
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

      <h2 className="typo-title2">O projektu</h2>
      <ProjectDescription project={project} />
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
  return (
    <section className="embedded-markdown max-w-prose">
      {renderedContent}
    </section>
  );
};

export default Page;
