import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "~/components/Breadcrumbs";
import {
  getPublicTeamEngagementsForUser,
  type TeamEngagement,
} from "~/src/data/team-engagement";
import { getUserProfile, type UserProfile } from "~/src/data/user-profile";
import { Route } from "~/src/routing";
import { skillsToHashtags } from "~/src/skills/skills";

type Params = {
  id: string;
};

export type Props = {
  params: Params;
};

async function Page({ params }: Props) {
  const profile = await getUserProfile(params.id);
  if (!profile) {
    // TBD: Maybe the profile is private?
    notFound();
  }
  const projectEngagements = await getPublicTeamEngagementsForUser(profile.id);
  const avatarUrl =
    profile.slackAvatarUrl ??
    "https://data.cesko.digital/people/generic-profile.jpg";
  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs
        path={[{ label: "Lidé", path: Route.people }]}
        currentPage={profile.name}
      />
      <div className="mt-10 grid grid-cols-4 gap-7">
        <div className="flex flex-col items-center gap-10">
          <Image
            src={avatarUrl}
            className="rounded-full bg-pebble"
            width={200}
            height={200}
            alt=""
          />
          <a
            href={`mailto:${profile.contactEmail ?? profile.email}`}
            className="btn-primary"
          >
            Napsat mail
          </a>
        </div>
        <div className="col-span-3 flex flex-col gap-7 pt-2">
          <IntroSection profile={profile} />
          {projectEngagements.length > 0 && (
            <ProjectSection engagements={projectEngagements} />
          )}
        </div>
      </div>
    </main>
  );
}

const IntroSection = ({ profile }: { profile: UserProfile }) => (
  <section>
    <h1 className="typo-title mb-4">{profile.name}</h1>
    <p>{skillsToHashtags(profile.skills)}</p>
  </section>
);

const ProjectSection = ({ engagements }: { engagements: TeamEngagement[] }) => (
  <section>
    <h2 className="typo-title2 mb-4">Moje projekty</h2>
    <ul className="leading-loose">
      {engagements.map((engagement) => (
        <li key={engagement.id}>
          <Link
            href={Route.toProject({ slug: engagement.projectSlug })}
            className="typo-link mr-3"
          >
            {engagement.projectName}
          </Link>
          {engagement.projectRole && (
            <span className="typo-caption text-gravel">
              {engagement.projectRole}
            </span>
          )}
        </li>
      ))}
    </ul>
  </section>
);

export default Page;
