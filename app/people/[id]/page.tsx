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
import { skillsToHashtags } from "~/src/skills/skills";

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

// TBD: Add experience, improve Background copy & display
const InfoTable = ({ profile }: { profile: UserProfile }) => {
  return (
    <div className="max-w-prose">
      {profile.skills && (
        <InfoRow label="Co dělám" content={skillsToHashtags(profile.skills)} />
      )}
      {profile.availableInDistricts && (
        <InfoRow label="Kde bývám" content={profile.availableInDistricts} />
      )}
      {profile.occupation && (
        <InfoRow label="Background" content={profile.occupation} />
      )}
      <ContactRows profile={profile} />
    </div>
  );
};

const ProjectSection = ({ engagements }: EngagementProps) => (
  <section>
    <h2 className="typo-title2 mb-4">Kde jsem se zapojil*a v Česko.Digital</h2>
    <ul className="leading-loose">
      {engagements.map((engagement) => (
        <li
          key={engagement.id}
          className="flex flex-col items-baseline md:flex-row"
        >
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
