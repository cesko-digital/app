"use client";

import Image from "next/image";
import Link from "next/link";

import { useCurrentUser } from "~/components/hooks/user";
import { iconForUrl } from "~/components/icons";
import {
  mergeUserProfileTags,
  type UserProfile,
} from "~/src/data/user-profile";
import { Route } from "~/src/routing";

export const IntroSection = ({ profile }: { profile: UserProfile }) => {
  const isCurrentUser = useCurrentUser(profile.id);
  return (
    <section>
      <div>
        <div className="flex flex-col justify-between gap-y-2 max-md:mb-3 md:flex-row">
          <div className="flex flex-row items-center gap-4">
            <h1 className="typo-title mb-2">{profile.name}</h1>
            {profile.profileUrl && (
              <a
                href={profile.profileUrl}
                className="typo-link opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
                target="_blank"
              >
                <Image
                  src={iconForUrl(profile.profileUrl)}
                  alt=""
                  width={24}
                  height={24}
                />
              </a>
            )}
          </div>
          {isCurrentUser && (
            <Link href={Route.account} className="btn-inverted">
              Upravit
            </Link>
          )}
        </div>
      </div>
      <div className="text-gravel">
        <ProfileTags profile={profile} />
      </div>
      {profile.bio && <p className="mt-2 max-w-prose">{profile.bio}</p>}
    </section>
  );
};

const ProfileTags = ({ profile }: { profile: UserProfile }) => {
  const tagify = (t: string) =>
    "#" + t.toLocaleLowerCase().replaceAll(/\s+/g, "-");
  const ToolIcon = () => <span className="opacity-70">🛠️</span>;
  const MapIcon = () => <span className="-ml-1 opacity-70">📍</span>;
  const WorkIcon = () => <span className="mr-1 opacity-70">💼</span>;
  return (
    <div className="mb-1 text-balance">
      {profile.tags && (
        <p className="mr-2 inline">
          <ToolIcon /> {profile.tags}
        </p>
      )}
      {profile.availableInDistricts && (
        <p className="mr-2 inline">
          <MapIcon />
          {profile.availableInDistricts?.split(/, /).map(tagify).join(" ")}
        </p>
      )}
      {profile.background && (
        <p className="mr-2 inline">
          <WorkIcon /> {profile.background}
        </p>
      )}
    </div>
  );
};
