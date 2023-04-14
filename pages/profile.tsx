import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { UserProfile } from "lib/airtable/user-profile";
import { encodeSkillSelection, SkillSelection } from "lib/skills";
import skillMenu from "content/skills.json";
import { UserProfilePageState, UserProfilePage } from "app/profile/main-page";

const Page = () => {
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
  }, [session, status, state]);

  return (
    <UserProfilePage
      skillMenu={skillMenu}
      state={state}
      profile={profile}
      signIn={() => signIn("slack")}
      signOut={() => signOut({ callbackUrl: "/" })}
      onSkillSelectionChange={updateUserSkills}
    />
  );
};

//
// User Profile
//

const getUserProfile = async (): Promise<UserProfile> =>
  await fetch("/profile/me").then((response) => response.json());

async function updateUserSkills(selection: SkillSelection): Promise<void> {
  const skills = encodeSkillSelection(selection);
  await fetch("/profile/me", {
    method: "PATCH",
    body: JSON.stringify({ skills }, null, 2),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default Page;
