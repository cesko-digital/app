"use client";

import Link from "next/link";

import { useCurrentUser } from "~/components/hooks/user";
import { getUserHashtags, type UserProfile } from "~/src/data/user-profile";
import { Route } from "~/src/routing";

export const IntroSection = ({ profile }: { profile: UserProfile }) => {
  const isCurrentUser = useCurrentUser(profile.id);
  const tidyUrl = (s: string) =>
    s.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <section>
      <div>
        <div className="flex flex-col justify-between gap-y-2 max-md:mb-3 md:flex-row">
          <h1 className="typo-title mb-2">{profile.name}</h1>
          {isCurrentUser && (
            <Link href={Route.account} className="btn-inverted">
              Upravit
            </Link>
          )}
        </div>
      </div>
      <div className="text-gravel">
        <p className="mb-1">{getUserHashtags(profile).join(" ")}</p>
        {profile.profileUrl && (
          <p>
            <a href={profile.profileUrl} className="typo-link" target="_blank">
              {tidyUrl(profile.profileUrl)}
            </a>
          </p>
        )}
      </div>
      {profile.bio && <p className="mt-2 max-w-prose">{profile.bio}</p>}
    </section>
  );
};
