import Image from "next/image";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "~/components/Breadcrumbs";
import { TextPill } from "~/components/TextPill";
import { getUserProfile } from "~/src/data/user-profile";
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
        <div className="col-span-3 pt-2">
          <h1 className="typo-title mb-4">{profile.name}</h1>
          <div>{skillsToHashtags(profile.skills)}</div>
        </div>
      </div>
    </main>
  );
}

export default Page;
