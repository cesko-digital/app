import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "~/components/Breadcrumbs";
import { iconForUrl } from "~/components/icons";
import {
  getPublicTeamEngagementsForUser,
  type TeamEngagement,
} from "~/src/data/team-engagement";
import { getUserProfile, type UserProfile } from "~/src/data/user-profile";
import { Route } from "~/src/routing";
import { getMaxSeniority, skillsToHashtags } from "~/src/skills/skills";

import { ContactRows } from "./ContactInfo";
import { InfoRow } from "./InfoRow";
import { UpdateProfileButton } from "./UpdateProfileButton";

type Params = {
  id: string;
};

export type Props = {
  params: Params;
};

type ProfileProps = { profile: UserProfile };
type EngagementProps = { engagements: TeamEngagement[] };

/** User profile page */
async function Page({ params }: Props) {
  const profile = await getUserProfile(params.id);
  const isPublic = profile?.privacyFlags.includes("enablePublicProfile");
  if (!profile) {
    notFound();
  }
  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs
        path={[{ label: "Lidé", path: Route.people }]}
        currentPage={profile.name}
      />
      {isPublic && <PublicProfile profile={profile} />}
      {!isPublic && <PrivateProfile profile={profile} />}
    </main>
  );
}

//
// Private Profile
//

const PrivateProfile = ({ profile }: ProfileProps) => (
  <div className="pt-12 text-center">
    <div className="inline-block">
      <Avatar profile={profile} />
      <h1 className="typo-title mb-2">{profile.name}</h1>
      <p>Tenhle profil je soukromý</p>
    </div>
  </div>
);

//
// Public Profile
//

// TODO: Add link to profile edit page for current user
const PublicProfile = async ({ profile }: ProfileProps) => {
  const engagements = await getPublicTeamEngagementsForUser(profile.id);
  const showProjectEngagement =
    !profile.privacyFlags.includes("hidePublicTeamMembership") &&
    engagements.length > 0;
  return (
    <div className="mt-10 flex flex-col gap-x-20 gap-y-10 md:flex-row">
      <div className="flex flex-col gap-7">
        <Avatar profile={profile} />
        <UpdateProfileButton profile={profile} />
      </div>
      <div className="flex flex-col gap-7 pt-2">
        <HeadingRow profile={profile} />
        <InfoTable profile={profile} />
        {showProjectEngagement && <ProjectSection engagements={engagements} />}
      </div>
    </div>
  );
};

const HeadingRow = ({ profile }: ProfileProps) => (
  <div>
    <div className="flex flex-col justify-between gap-y-2 max-md:mb-3 md:flex-row">
      <div className="flex flex-row items-center gap-4">
        <h1 className="typo-title mb-2">{profile.name}</h1>
        {profile.profileUrl && (
          <ProfessionalProfileLink link={profile.profileUrl} />
        )}
      </div>
    </div>
    {profile.bio && <p className="mt-2 max-w-prose">{profile.bio}</p>}
  </div>
);

const ProfessionalProfileLink = ({ link }: { link: string }) => (
  <a
    href={link}
    className="typo-link opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
    target="_blank"
  >
    <Image src={iconForUrl(link)} alt="" width={24} height={24} />
  </a>
);

// TBD: Add experience
const InfoTable = ({ profile }: { profile: UserProfile }) => {
  const tags = skillsToHashtags(profile.skills);
  const labels: Record<string, string> = {
    "private-sector": "V soukromém sektoru",
    "non-profit": "V nezisku",
    "state": "Ve veřejné správě",
    "freelancing": "Na volné noze",
    "studying": "Studuju",
    "parental-leave": "Jsem na rodičovské",
    "looking-for-job": "Hledám práci!",
  };
  const occupation = profile.occupation
    ? labels[profile.occupation]
    : undefined;
  const seniority = getMaxSeniority(profile.skills);
  return (
    <div className="max-w-prose">
      {tags.length > 0 && <InfoRow label="Co dělám" content={tags} />}
      {seniority && <InfoRow label="Seniorita" content={seniority} />}
      {profile.availableInDistricts && (
        <InfoRow label="Kde bývám" content={profile.availableInDistricts} />
      )}
      {occupation && <InfoRow label="Kde pracuju" content={occupation} />}
      <ContactRows profile={profile} />
    </div>
  );
};

const ProjectSection = ({ engagements }: EngagementProps) => {
  const isRunning = (e: TeamEngagement) => e.projectState === "running";
  const runningFirst = (a: TeamEngagement, b: TeamEngagement) =>
    isRunning(a) ? -1 : isRunning(b) ? 1 : 0;

  const RunningMarker = () => (
    <span
      className="animate-pulse text-green-500"
      title="Aktuálně běžící projekt"
    >
      ⦿
    </span>
  );

  return (
    <section>
      <h2 className="typo-title2 mb-4">
        Kde jsem se zapojil*a v Česko.Digital
      </h2>
      <ul className="leading-loose">
        {engagements.sort(runningFirst).map((engagement) => (
          <li
            key={engagement.id}
            className="flex flex-col items-baseline gap-x-3 md:flex-row"
          >
            <span className="flex flex-row items-center gap-2">
              <Link
                href={Route.toProject({ slug: engagement.projectSlug })}
                className="typo-link"
              >
                {engagement.projectName}
              </Link>
              {engagement.projectState === "running" && <RunningMarker />}
            </span>
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
};

const Avatar = ({ profile }: ProfileProps) => (
  <Image
    src={profile.avatarUrl}
    className="mx-auto rounded-full bg-pebble"
    width={200}
    height={200}
    alt=""
  />
);

//
// Data Loading
//

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const profile = await getUserProfile(params.id);
  if (!profile) {
    return {};
  }
  return {
    title: `${profile.name} | Česko.Digital`,
  };
}

/** Force incremental static generation (ISR), see https://github.com/cesko-digital/web/issues/987 */
export async function generateStaticParams() {
  return [];
}

/** Refresh data every 5 minutes */
export const revalidate = 300;

export default Page;
