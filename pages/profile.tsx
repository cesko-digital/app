import { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { UserProfilePageState, UserProfilePage } from "components/user-profile";
import { decodeUserProfile, UserProfile } from "lib/user-profile";

const Page: NextPage = () => {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<UserProfile | undefined>();
  const [state, setState] = useState<UserProfilePageState>("loading");

  const triggerLoad = async () => {
    try {
      const profile = await getUserProfile();
      setProfile(profile);
      setState("signed_in");
    } catch (error) {
      setState("loading_error");
    }
  };

  useEffect(() => {
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
        break;
      case "loading":
        setState("loading");
        break;
    }
  }, [session, status, state]);

  return (
    <UserProfilePage
      state={state}
      profile={profile}
      signIn={() => signIn("slack")}
      signOut={signOut}
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

export default Page;
