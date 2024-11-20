"use client";

import { useState } from "react";

import { SkillList } from "~/components/profile/SkillList";
import {
  UserProfileCard,
  UserProfileContainer,
} from "~/components/UserProfileCard";
import { compareByName, type UserProfile } from "~/src/data/user-profile";

type Props = {
  allUserProfiles: ReadonlyArray<UserProfile>;
};

export const SearchablePeopleBox = ({ allUserProfiles }: Props) => {
  const [query, setQuery] = useState("");
  const profiles = allUserProfiles.filter((p) => match(p, query));
  return (
    <div>
      <div className="mb-10">
        <input
          type="text"
          className="w-full max-w-prose rounded-sm border-2 border-gray p-2"
          placeholder="filtruj kámo"
          onChange={(e) => setQuery(e.target.value)}
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

const normalize = (s: string) =>
  s
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const match = (profile: UserProfile, query: string): boolean => {
  const scalarMatches = (value: string | undefined) =>
    value ? normalize(value).includes(normalize(query)) : false;
  return (
    scalarMatches(profile.name) ||
    scalarMatches(profile.tags) ||
    scalarMatches(profile.bio)
  );
};
