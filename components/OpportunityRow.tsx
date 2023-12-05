import { Fragment } from "react";
import Link from "next/link";

import { Opportunity } from "src/data/opportunity";
import { Project } from "src/data/project";
import { Route } from "src/routing";

import { ProjectImageLabel } from "./ImageLabel";
import { TextPill } from "./TextPill";

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
    <div className="last mb-7 flex flex-col-reverse gap-3 border-b-2 border-pebble pb-7 md:flex-row md:gap-7">
      {/* Role description */}
      <Link href={Route.toOpportunity(role)}>
        <h3 className="typo-title3 mb-2">{role.name}</h3>
        <p>
          {pills.map((text) => (
            <TextPill key={text} text={text} />
          ))}
        </p>
      </Link>
      {/* Project badge */}
      {project && (
        <Fragment>
          {/* Regular version from `md` size class up */}
          <div className="ml-auto hidden md:block">
            <ProjectImageLabel
              project={project}
              order="labelFirst"
              size="large"
            />
          </div>
          {/* Tiny version below `md` size class */}
          <div className="md:hidden">
            <ProjectImageLabel
              project={project}
              order="imageFirst"
              size="small"
            />
          </div>
        </Fragment>
      )}
    </div>
  );
};
