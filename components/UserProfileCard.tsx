import Image from "next/image";
import Link from "next/link";

import clsx from "clsx";

import { type UserProfile } from "~/src/data/user-profile";
import { Route } from "~/src/routing";

export type Props = {
  profile: Pick<UserProfile, "name" | "slackAvatarUrl" | "id">;
  label?: string;
};

export const UserProfileCard = ({ profile, label }: Props) => {
  const avatarUrl =
    profile.slackAvatarUrl ??
    "https://data.cesko.digital/people/generic-profile.jpg";
  return (
    <Link
      href={Route.toProfile(profile)}
      className={clsx(
        "flex gap-4 p-4 pt-7 sm:flex-col sm:gap-2 sm:text-center",
        "rounded-xl border-2 border-gray bg-pebble hover:border-it hover:shadow-lg",
      )}
    >
      {/* The extra no-shrink div fixes the layout when the right box is taller */}
      <div className="shrink-0">
        <Image
          src={avatarUrl}
          className={clsx(
            "shrink-0 rounded-full bg-gray shadow",
            // This fixes the appearance of non-square images
            "aspect-square object-cover object-top",
            "sm:mx-auto",
          )}
          alt=""
          width={80}
          height={80}
        />
      </div>
      <div className="flex flex-col gap-2 self-center">
        <h3 className="typo-subtitle">{profile.name}</h3>
        {label && <p className="typo-caption">{label}</p>}
      </div>
    </Link>
  );
};

export const UserProfileContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    {children}
  </div>
);
