"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { SkillList } from "~/components/profile/SkillList";
import {
  UserProfileCard,
  UserProfileContainer,
} from "~/components/UserProfileCard";
import { compareByName } from "~/src/data/user-profile";

import { match, type PublicUserProfile } from "./matching";

type Props = {
  allUserProfiles: ReadonlyArray<PublicUserProfile>;
};

export const SearchablePeopleBox = ({ allUserProfiles }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const profiles = allUserProfiles.filter((p) => match(p, query));

  const onQueryChange = (q: string) => {
    router.replace("/people?" + new URLSearchParams({ q }).toString());
    setQuery(q);
  };

  return (
    <div>
      <div className="mb-10">
        <input
          type="text"
          className="w-full max-w-prose rounded-sm border-2 border-gray p-2"
          placeholder="filtruj kámo"
          defaultValue={query}
          onChange={(e) => onQueryChange(e.target.value)}
        ></input>
      </div>
      <UserProfileContainer>
        {profiles.sort(compareByName).map((profile) => (
          <UserProfileCard
            key={profile.id}
            profile={profile}
            label={<SkillList skills={profile.tags.split(/;\s*/)} />}
          />
        ))}
      </UserProfileContainer>
    </div>
  );
};
