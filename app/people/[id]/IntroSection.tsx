"use client";

import Link from "next/link";

import { useCurrentUser } from "~/components/hooks/user";
import { getUserHashtags, type UserProfile } from "~/src/data/user-profile";
import { Route } from "~/src/routing";

export const IntroSection = ({ profile }: { profile: UserProfile }) => {
  const isCurrentUser = useCurrentUser(profile.id);
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col justify-between gap-y-2 md:flex-row">
        <h1 className="typo-title mb-2">{profile.name}</h1>
        {isCurrentUser && (
          <Link href={Route.account} className="btn-inverted">
            Upravit
          </Link>
        )}
      </div>
      <p>{getUserHashtags(profile).join(" ")}</p>
      {profile.bio && <p className="max-w-prose">{profile.bio}</p>}
    </section>
  );
};
