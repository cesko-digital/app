import { NextPage, GetStaticProps } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { UserProfilePageState, UserProfilePage } from "components/user-profile";
import { decodeUserProfile, UserProfile } from "lib/user-profile";
import { flattenSkills, Skill } from "lib/skills";
import { siteData } from "lib/site-data";

type PageProps = {
  allSkills: Skill[];
};

const Page: NextPage<PageProps> = ({ allSkills }) => {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<UserProfile | undefined>();
  const [state, setState] = useState<UserProfilePageState>("loading");

  useEffect(() => {
    const triggerLoad = async () => {
      try {
        const profile = await getUserProfile();
        setProfile(profile);
        setState("signed_in");
      } catch (error) {
        setState("loading_error");
      }
    };

    console.debug(`Session status changed to “${status}”.`);
    switch (status) {
      case "authenticated":
        if (session && state !== "signed_in") {
          console.debug(`Triggering user profile load.`);
          triggerLoad();
        }
        break;
      case "unauthenticated":
        setState("signed_out");
        setProfile(undefined);
        break;
      case "loading":
        setState("loading");
        break;
    }
  }, [session, status, state, allSkills]);

  const saveSkills = async (skills: Skill[]) => {
    console.debug(`Saving user skills.`);
    await updateUserProfile(skills);
  };

  return (
    <UserProfilePage
      allSkills={allSkills}
      state={state}
      profile={profile}
      signIn={() => signIn("slack")}
      signOut={() => signOut({ redirect: false })}
      onUserSkillsChange={saveSkills}
    />
  );
};

async function getUserProfile(): Promise<UserProfile> {
  const response = await fetch("/api/protected/me");
  if (response.ok) {
    const payload = await response.json();
    return decodeUserProfile(payload);
  } else {
    throw response.statusText;
  }
}

async function updateUserProfile(skills: Skill[]): Promise<void> {
  const payload = {
    // We’re only sending the skill IDs to the API
    skills: skills.map((skill) => skill.id),
  };
  await fetch("/api/protected/me", {
    method: "PATCH",
    body: JSON.stringify(payload, null, 2),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const allSkills = flattenSkills(siteData.skills);
  return {
    props: { allSkills },
  };
};

export default Page;
