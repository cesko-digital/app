import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "~/components/Breadcrumbs";
import {
  getPublicTeamEngagementsForUser,
  type TeamEngagement,
} from "~/src/data/team-engagement";
import {
  getUserHashtags,
  getUserProfile,
  type UserProfile,
} from "~/src/data/user-profile";
import { Route } from "~/src/routing";

type Params = {
  id: string;
};

export type Props = {
  params: Params;
};

async function Page({ params }: Props) {
  const profile = await getUserProfile(params.id);
  const isPublic = profile?.privacyFlags.includes("enablePublicProfile");
  if (!profile) {
    notFound();
  }
  const projectEngagements = await getPublicTeamEngagementsForUser(profile.id);
  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs
        path={[{ label: "Lidé", path: Route.people }]}
        currentPage={profile.name}
      />
      <div className="mt-10 flex flex-col gap-x-20 gap-y-10 md:flex-row">
        {isPublic ? (
          <PublicProfile profile={profile} engagements={projectEngagements} />
        ) : (
          <PrivateProfile profile={profile} />
        )}
      </div>
    </main>
  );
}

const PublicProfile = ({
  profile,
  engagements,
}: {
  profile: UserProfile;
  engagements: TeamEngagement[];
}) => (
  <>
    <ContactSidebar profile={profile} />
    <div className="flex flex-col gap-7 pt-2">
      <IntroSection profile={profile} />
      {engagements.length > 0 && <ProjectSection engagements={engagements} />}
    </div>
  </>
);

const PrivateProfile = ({ profile }: { profile: UserProfile }) => (
  <>
    <Avatar profile={profile} />
    <div className="flex flex-col gap-7 pt-2">
      <h1 className="typo-title">{profile.name}</h1>
      <p>Tenhle profil je soukromý.</p>
    </div>
  </>
);

const ContactSidebar = ({ profile }: { profile: UserProfile }) => {
  const Button = ({ url, label }: { url: string; label: string }) => (
    <Link href={url} className="btn-primary">
      {label}
    </Link>
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar profile={profile} />
      {profile.slackId && (
        <Button
          label="Poslat zprávu na Slacku"
          url={`slack://user?team=TG21XF887&id=${profile.slackId}`}
        />
      )}
      <Button
        label="Napsat mail"
        url={`mailto:${profile.contactEmail ?? profile.email}`}
      />
    </div>
  );
};

const IntroSection = ({ profile }: { profile: UserProfile }) => {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="typo-title">{profile.name}</h1>
      <p>{getUserHashtags(profile).join(" ")}</p>
      {profile.bio && <p className="max-w-prose">{profile.bio}</p>}
    </section>
  );
};

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

const Avatar = ({ profile }: { profile: UserProfile }) => {
  const avatarUrl =
    profile.slackAvatarUrl ??
    "https://data.cesko.digital/people/generic-profile.jpg";
  return (
    <Image
      src={avatarUrl}
      className="mb-7 rounded-full bg-pebble"
      width={200}
      height={200}
      alt=""
    />
  );
};

export default Page;
