import { NotificationFlag } from "lib/airtable/user-profile";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export type Model =
  | { state: "loading" }
  | { state: "notSignedIn" }
  | { state: "error" }
  | { state: "updating"; desiredState: NotificationFlag[] }
  | { state: "ready"; flags: NotificationFlag[] };

/**
 * Query and set user notification flags
 *
 * Note that the value also depends on login session state.
 *
 * TBD: Generalize to user profile hook?
 */
export function useNotificationFlags() {
  const { status: sessionState } = useSession();
  const [model, setModel] = useState<Model>({
    state: "notSignedIn",
  });

  // Read state when session changes
  useEffect(() => {
    async function loadStatus() {
      const flags = await getNotificationFlags();
      if (flags) {
        setModel({ state: "ready", flags });
      } else {
        setModel({ state: "error" });
      }
    }
    if (sessionState === "authenticated") {
      loadStatus();
    } else if (sessionState === "loading") {
      setModel({ state: "loading" });
    } else {
      setModel({ state: "notSignedIn" });
    }
  }, [sessionState]);

  // Update state
  const updateStatus = async (flags: NotificationFlag[]) => {
    if (model.state !== "ready") {
      throw "Cannot update state, model not ready";
    }
    const originalValue = model.flags;
    setModel({ state: "updating", desiredState: flags });
    const succeeded = await setNotificationFlags(flags);
    const newValue = succeeded ? flags : originalValue;
    setModel({
      state: "ready",
      flags: newValue,
    });
  };

  return [model, updateStatus] as const;
}

const setNotificationFlags = async (notificationFlags: NotificationFlag[]) =>
  await fetch("/profile/me", {
    method: "PATCH",
    body: JSON.stringify({ notificationFlags }, null, 2),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.ok);

const getNotificationFlags = async (): Promise<NotificationFlag[] | null> =>
  await fetch("/profile/me")
    .then((response) => response.json())
    .then((profile) => profile.notificationFlags)
    .catch((e) => null);
