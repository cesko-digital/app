import { type Project } from "~/src/data/project";
import { Route } from "~/src/routing";

import { Card } from "./Card";

export type Props = {
  project: Project;
  fade?: boolean;
};

export const ProjectCard = ({ project, fade = false }: Props) => (
  <Card
    coverImageUrl={project.coverImageUrl}
    linkUrl={Route.toProject(project)}
    badgeImageUrl={project.logoUrl}
    fade={fade}
  >
    <div className="flex flex-col gap-4 p-7">
      <h3 className="typo-title3">{project.name}</h3>
      <p>{project.tagline}</p>
    </div>
  </Card>
);
