import Image from "next/image";
import Link from "next/link";
import { Opportunity } from "src/data/opportunity";
import { Project } from "src/data/project";
import { Route } from "src/routing";
import { ProjectImageLabel } from "./ImageLabel";

export type Props = {
  /** Role to display data for */
  role: Opportunity;
  /** Optional project to display for context */
  project?: Project;
};

/** A simple styled display for a wanted role */
export const OpportunityRow = ({ role, project }: Props) => {
  const pills = [role.timeRequirements, role.skills.join(" / ")];
  return (
    <div className="flex flex-row gap-7 pb-7 mb-7 last border-b-2 border-pebble">
      {/* Left side: Role description */}
      <Link href={Route.toOpportunity(role)}>
        <h3 className="typo-title3 mb-2">{role.name}</h3>
        <p>
          {pills.map((p) => (
            <span
              key={p}
              className="inline-block px-2 mr-2 rounded-lg bg-pebble"
            >
              {p}
            </span>
          ))}
        </p>
      </Link>
      {/* Right side: Project badge */}
      {project && (
        <div className="ml-auto">
          <ProjectImageLabel
            project={project}
            order="labelFirst"
            size="large"
          />
        </div>
      )}
    </div>
  );
};
