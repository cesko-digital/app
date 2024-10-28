import {
  UserProfileCard,
  UserProfileContainer,
} from "~/components/UserProfileCard";
import { type TeamEngagement } from "~/src/data/team-engagement";
import { defaultAvatarUrl, unique } from "~/src/utils";

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
          <UserProfileContainer>
            {engagements.map((e) => (
              <UserProfileCard
                key={e.id}
                label={e.projectRole}
                profile={{
                  id: e.userId,
                  name: e.userName,
                  profilePictureUrl: e.profilePictureUrl ?? defaultAvatarUrl,
                }}
              />
            ))}
          </UserProfileContainer>
        </div>
      ))}
    </section>
  );
};

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
