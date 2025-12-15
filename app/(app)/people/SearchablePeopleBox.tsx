"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useDebounce } from "~/components/hooks/debounce";
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
  const debouncedQuery = useDebounce(query, 275); // Wait 275 ms for the query to settle
  const profiles = allUserProfiles.filter((p) => match(p, debouncedQuery));

  const onQueryChange = (q: string) => {
    const params = new URLSearchParams({ q });
    router.replace("/people?" + params.toString(), {
      scroll: false,
    });
    setQuery(q);
  };

  return (
    <div>
      <div className="mb-10">
        <input
          type="text"
          className="w-full max-w-prose rounded-sm border-2 border-gray p-2"
          placeholder="filtrovat podle jména, dovedností, …"
          defaultValue={query}
          onChange={(e) => onQueryChange(e.target.value)}
        ></input>
      </div>
      {profiles.length > 0 && (
        <UserProfileContainer>
          {profiles.sort(compareByName).map((profile) => (
            <UserProfileCard
              key={profile.id}
              profile={profile}
              label={<SkillList skills={profile.tags.split(/;\s*/)} />}
            />
          ))}
        </UserProfileContainer>
      )}
      {profiles.length === 0 && <p>Dotazu neodpovídá žádný veřejný profil.</p>}
    </div>
  );
};
