import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  decodeNewsletterPreferences,
  NewsletterPreferences,
} from "lib/ecomail";

export type Model =
  | { state: "loading" }
  | { state: "notSignedIn" }
  | { state: "error" }
  | { state: "updating"; value: NewsletterPreferences }
  | { state: "ready"; value: NewsletterPreferences };

export function useNewsletterPrefs() {
  const { status: sessionState } = useSession();
  const [model, setModel] = useState<Model>({
    state: "notSignedIn",
  });

  // Read state when session changes
  useEffect(() => {
    async function loadStatus() {
      const prefs = await getPreferences();
      if (prefs) {
        setModel({ state: "ready", value: prefs });
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
  const updateStatus = async (prefs: NewsletterPreferences) => {
    if (model.state !== "ready") {
      throw "Cannot update state, model not ready";
    }
    const originalValue = model.value;
    setModel({ state: "updating", value: prefs });
    const succeeded = await setPreferences(prefs);
    const newValue = succeeded ? prefs : originalValue;
    setModel({
      state: "ready",
      value: newValue,
    });
  };

  return [model, updateStatus] as const;
}

const getPreferences = async () =>
  await fetch("/profile/newsletters")
    .then((response) => response.json())
    .then(decodeNewsletterPreferences)
    .catch((e) => null);

const setPreferences = async (preferences: NewsletterPreferences) =>
  await fetch("/profile/newsletters", {
    method: "POST",
    body: JSON.stringify(preferences),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.ok)
    .catch((e) => false);
