import Image from "next/image";

import clsx from "clsx";

import { type TeamEngagement } from "~/src/data/team-engagement";

export const ProjectTeamSection = ({ team }: { team: TeamEngagement[] }) => (
  <section>
    <h2 className="typo-title2 mb-7">Tým</h2>
    <div className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {team.map((e) => (
        <EngagementCard key={e.id} engagement={e} />
      ))}
    </div>
  </section>
);

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
