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
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  const [profile, setProfile] = useState<UserProfile | undefined>();
  const [state, setState] = useState<UserProfilePageState>("loading");

  useEffect(() => {
    const triggerLoad = async () => {
      try {
        const profile = await getUserProfile();
        setUserSkills(
          allSkills.filter((skill) => profile.skills.includes(skill.id))
        );
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
        setUserSkills([]);
        break;
      case "loading":
        setState("loading");
        break;
    }
  }, [session, status, state, allSkills]);

  return (
    <UserProfilePage
      userSkills={userSkills}
      state={state}
      profile={profile}
      signIn={() => signIn("slack")}
      signOut={() => signOut({ redirect: false })}
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

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const allSkills = flattenSkills(siteData.skills);
  return {
    props: { allSkills },
  };
};

export default Page;
