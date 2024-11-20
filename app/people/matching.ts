import { type UserProfile } from "~/src/data/user-profile";
import { subset } from "~/src/utils";

const publicProps = ["id", "name", "bio", "tags", "profilePictureUrl"] as const;

export type PublicUserProfile = Pick<UserProfile, (typeof publicProps)[number]>;

export const stripNonPublicFields = (profile: UserProfile) =>
  subset(profile, publicProps) as PublicUserProfile;

export const match = (profile: PublicUserProfile, query: string): boolean => {
  const scalarMatches = (value: string | undefined) =>
    value ? normalize(value).includes(normalize(query)) : false;
  return (
    scalarMatches(profile.name) ||
    scalarMatches(profile.tags) ||
    scalarMatches(profile.bio)
  );
};

const normalize = (s: string) =>
  s
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
