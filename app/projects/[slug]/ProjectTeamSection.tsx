import Image from "next/image";

import clsx from "clsx";

import { type TeamEngagement } from "~/src/data/team-engagement";
import { unique } from "~/src/utils";

type Subteam = [string, TeamEngagement[]];

export const ProjectTeamSection = ({
  team: engagements,
}: {
  team: TeamEngagement[];
}) => {
  const subteams = splitSubteams(engagements);
  return (
    <section>
      {subteams.map(([label, engagements]) => (
        <div key={label} className="mb-7">
          <h2 className="typo-title2 mb-4">{label}</h2>
          <div className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {engagements.map((e) => (
              <EngagementCard key={e.id} engagement={e} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

const EngagementCard = ({ engagement }: { engagement: TeamEngagement }) => (
  <div className="flex gap-4 rounded-lg bg-pebble p-4 pt-7 sm:flex-col sm:gap-2 sm:text-center">
    <Image
      src={engagement.userAvatarUrl}
      className={clsx(
        "rounded-full bg-gray shadow",
        // This fixes the appearance of non-square images
        "aspect-square object-cover object-top",
        "sm:mx-auto",
      )}
      alt=""
      width={80}
      height={80}
    />
    <div className="self-center">
      <h3 className="typo-subtitle">{engagement.userName}</h3>
      <p>{engagement.projectRole}</p>
    </div>
  </div>
);

function splitSubteams(engagements: TeamEngagement[]): Subteam[] {
  /** Unique list of fields used in team engagements */
  const usedFields = unique(engagements.flatMap((e) => e.fields));

  /** The percentage of engagements that have at least one field listed */
  const fieldUsageRatio =
    engagements.filter((e) => e.fields.length > 0).length / engagements.length;

  const fieldEngagements = (field: string) =>
    engagements.filter((e) => e.fields.includes(field));

  if (fieldUsageRatio < 0.5) {
    return [["Tým", engagements]];
  }

  let partitions: Subteam[] = usedFields.map((field) => [
    field,
    fieldEngagements(field),
  ]);

  const unassigned = engagements.filter((e) => e.fields.length === 0);
  if (unassigned.length > 0) {
    partitions = [...partitions, ["Ostatní", unassigned]];
  }

  return partitions;
}
