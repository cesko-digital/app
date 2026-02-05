"use client";

import Link from "next/link";

import { useIsCurrentUser } from "~/components/hooks/user";
import { type UserProfile } from "~/src/data/user-profile";
import { Route } from "~/src/routing";

export const UpdateProfileButton = ({ profile }: { profile: UserProfile }) => {
  const isCurrentUser = useIsCurrentUser(profile.id);
  return isCurrentUser ? (
    <Link className="btn-inverted" href={Route.account}>
      Upravit profil
    </Link>
  ) : null;
};
