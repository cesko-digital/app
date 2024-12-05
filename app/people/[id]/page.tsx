import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "~/components/Breadcrumbs";
import { iconForUrl } from "~/components/icons";
import { CeskoDigital } from "~/components/icons/generic";
import { SkillList } from "~/components/profile/SkillList";
import {
  getPublicTeamEngagementsForUser,
  type TeamEngagement,
} from "~/src/data/team-engagement";
import {
  getUserProfile,
  semicolonStrToArr,
  type UserProfile,
} from "~/src/data/user-profile";
import { Route } from "~/src/routing";
import { defaultAvatarUrl } from "~/src/utils";

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
      <h1 className="typo-title my-2">{profile.name}</h1>
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
      <div className="flex max-w-[200px] flex-col gap-7 max-sm:mx-auto">
        <Avatar profile={profile} />
        {profile.roles && profile.roles.includes("Core Team Member") && (
          <p className="text-center">Člen*ka placeného týmu Česko.Digital</p>
        )}
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
    {profile.bio && (
      <p className="mt-2 max-w-prose whitespace-pre-line">
        {/* Make newlines consistent */}
        {profile.bio.replaceAll(/\n+/g, "\n\n")}
      </p>
    )}
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

function decodeOccupations(occupations?: string): string {
  const labels: Record<string, string> = {
    "private-sector": "V soukromém sektoru",
    "non-profit": "V nezisku",
    "state": "Ve veřejné správě",
    "freelancing": "Na volné noze",
    "studying": "Studuju",
    "parental-leave": "Jsem na rodičovské",
    "looking-for-job": "Hledám práci!",
  };
  const occupationSet = new Set(semicolonStrToArr(occupations));
  return Array.from(occupationSet)
    .map((id) => labels[id])
    .join("; ");
}

const InfoTable = ({ profile }: { profile: UserProfile }) => {
  const occupations = decodeOccupations(profile.occupation);
  return (
    <div className="max-w-prose">
      {profile.tags.length > 0 && (
        <InfoRow label="Co dělám">
          <SkillList skills={profile.tags.split(/;\s*/)} />
        </InfoRow>
      )}
      {profile.maxSeniority && (
        <InfoRow label="Seniorita">{profile.maxSeniority}</InfoRow>
      )}
      {profile.availableInDistricts && (
        <InfoRow label="K zastižení">{profile.availableInDistricts}</InfoRow>
      )}
      {occupations && <InfoRow label="Kde pracuju">{occupations}</InfoRow>}
      <ContactRows profile={profile} />
    </div>
  );
};

const ProjectSection = ({ engagements }: EngagementProps) => {
  const isRunning = (e: TeamEngagement) => e.projectState === "running";
  const runningFirst = (a: TeamEngagement, b: TeamEngagement) =>
    isRunning(a) ? -1 : isRunning(b) ? 1 : 0;

  const RunningMarker = () => (
    <span className="typo-caption rounded-md border-[1px] border-green-500 px-2 text-green-500">
      běží
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
  <div className="relative mx-auto aspect-square w-[200px]">
    <Image
      src={profile.profilePictureUrl ?? defaultAvatarUrl}
      className="aspect-square rounded-full bg-pebble object-cover object-top"
      width={200}
      height={200}
      alt=""
    />
    {profile.roles.includes("Core Team Member") && (
      <Image
        className="absolute bottom-[12px] right-[12px]"
        src={CeskoDigital}
        width={30}
        height={30}
        alt="Člen*ka placeného týmu Česko.Digital"
      />
    )}
  </div>
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
