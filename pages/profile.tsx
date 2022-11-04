import { NextPage, GetStaticProps } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { decodeUserProfile, UserProfile } from "lib/airtable/user-profile";
import { SubscriptionState, subscriptionStates } from "lib/ecomail";
import { record, union } from "typescript-json-decoder";
import { getDefaultSkillMenu } from "lib/skills";
import {
  SkillMenu,
  SkillSelection,
} from "components/user-profile/skill-picker";
import {
  UserProfilePageState,
  UserProfilePage,
} from "components/user-profile/page";

type PageProps = {
  skillMenu: SkillMenu;
};

const Page: NextPage<PageProps> = ({ skillMenu }) => {
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
  }, [session, status, state, skillMenu]);

  const saveSkillSelection = async (selection: SkillSelection) => {
    // TBD: Update DB
    console.debug(
      `Updated skill selection: ${JSON.stringify(selection, null, 2)}`
    );
  };

  return (
    <UserProfilePage
      skillMenu={skillMenu}
      state={state}
      profile={profile}
      signIn={() => signIn("slack")}
      signOut={() => signOut({ callbackUrl: "/" })}
      onSkillSelectionChange={saveSkillSelection}
      newsletterProps={{
        getSubscription: getNewsletterSubscription,
        subscribe: subscribeNewsletter,
        unsubscribe: unsubscribeNewsletter,
      }}
    />
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const skillMenu = await getDefaultSkillMenu();
  return {
    props: { skillMenu },
  };
};

//
// User Profile
//

async function getUserProfile(): Promise<UserProfile> {
  const response = await fetch("/api/protected/me");
  if (response.ok) {
    const payload = await response.json();
    return decodeUserProfile(payload);
  } else {
    throw response.statusText;
  }
}

// TBD: Update for new DB schema
async function updateUserProfile(skills: SkillSelection): Promise<void> {
  await fetch("/api/protected/me", {
    method: "PATCH",
    body: JSON.stringify(skills, null, 2),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

//
// Newsletter
//

async function getNewsletterSubscription(): Promise<SubscriptionState> {
  const decodeSubscriptionState = union(...subscriptionStates);
  const decodeSubscriptionResponse = record({ state: decodeSubscriptionState });
  return await fetch("/api/protected/newsletter_subscription")
    .then((res) => res.json())
    .then(decodeSubscriptionResponse)
    .then((res) => res.state);
}

async function updateNewsletterSubscription(
  state: SubscriptionState
): Promise<void> {
  await fetch("/api/protected/newsletter_subscription", {
    method: "POST",
    body: JSON.stringify({ state }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

const subscribeNewsletter = () => updateNewsletterSubscription("subscribed");
const unsubscribeNewsletter = () =>
  updateNewsletterSubscription("unsubscribed");

export default Page;
