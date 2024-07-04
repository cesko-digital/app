import Image from "next/image";

import clsx from "clsx";

import { type UserProfile } from "~/src/data/user-profile";

export type Props = {
  profile: UserProfile;
  label?: string;
};

// TBD: Use this to display team engagement card
// TBD: Would it make sense to share the container grid, too?
export const UserProfileCard = ({ profile, label }: Props) => {
  const avatarUrl =
    profile.slackAvatarUrl ??
    "https://data.cesko.digital/people/generic-profile.jpg";
  return (
    <div className="flex gap-4 rounded-lg bg-pebble p-4 pt-7 sm:flex-col sm:gap-2 sm:text-center">
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
    </div>
  );
};
