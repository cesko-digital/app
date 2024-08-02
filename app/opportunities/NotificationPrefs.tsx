"use client";

import { signIn, useSession } from "next-auth/react";

import { usePatchedJSONResource } from "~/components/hooks/resource";
import { type UserProfile } from "~/src/data/user-profile";
import { setFlag } from "~/src/flags";

export const NotificationPrefs = () => {
  const { status: sessionStatus } = useSession();
  return (
    <div className="mb-10">
      {sessionStatus === "loading" && <LoadingSpinner />}
      {sessionStatus === "authenticated" && <SignedInPrefs />}
      {sessionStatus === "unauthenticated" && <SignedOutPrefs />}
    </div>
  );
};

const SignedInPrefs = () => {
  const { model, updating, setModel } = usePatchedJSONResource<UserProfile>({
    url: "/account/me",
    writeKeys: ["notificationFlags"],
  });
  const toggleFlag = async (checked: boolean) => {
    if (model) {
      const notificationFlags = setFlag(
        model.notificationFlags,
        "receiveNewRoleNotifications",
        checked,
      );
      setModel({ ...model, notificationFlags });
    }
  };
  return (
    <label className="items-top flex md:items-center">
      <input
        checked={model?.notificationFlags.includes(
          "receiveNewRoleNotifications",
        )}
        type="checkbox"
        className="mr-3 max-md:mt-2"
        disabled={updating}
        onChange={(e) => toggleFlag(e.target.checked)}
      ></input>
      Pošlete mi mail, když se tu objeví něco nového
    </label>
  );
};

const SignedOutPrefs = () => (
  <div>
    Tip:{" "}
    <a
      className="typo-link"
      onClick={(e) => {
        e.preventDefault();
        return signIn();
      }}
    >
      Když se přihlásíš
    </a>
    , můžeš si zapnout odběr novinek mailem.
  </div>
);

const LoadingSpinner = () => (
  <div className="w-[50ex] animate-pulse rounded-lg bg-gray indent-[-9999px]">
    Načítám…
  </div>
);
