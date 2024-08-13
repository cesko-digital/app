import Image from "next/image";
import Link from "next/link";

import clsx from "clsx";

import { CeskoDigital } from "~/components/icons/generic";
import { type UserProfile } from "~/src/data/user-profile";
import { Route } from "~/src/routing";

export type Props = {
  profile: Pick<UserProfile, "name" | "avatarUrl" | "id"> &
    Partial<Pick<UserProfile, "roles">>;
  label?: string;
};

export const UserProfileCard = ({ profile, label }: Props) => {
  const CoreTeamMarker = () => (
    <Image
      src={CeskoDigital}
      className="absolute right-3 top-3 cursor-help rounded-full"
      width={20}
      height={20}
      title="Člen*ka placeného týmu Česko.Digital"
      alt="Člen*ka placeného týmu Česko.Digital"
    />
  );
  return (
    <Link
      href={Route.toProfile(profile)}
      className={clsx(
        "relative flex gap-4 overflow-clip p-4 pt-7 sm:flex-col sm:gap-2 sm:text-center",
        "rounded-xl border-2 border-gray bg-pebble hover:border-it hover:shadow-lg",
      )}
    >
      {profile.roles && profile.roles.includes("Core Team Member") && (
        <CoreTeamMarker />
      )}
      {/* The extra no-shrink div fixes the layout when the right box is taller */}
      <div className="shrink-0">
        <Image
          src={profile.avatarUrl}
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
        {label && <p className="typo-caption leading-relaxed">{label}</p>}
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
