import { UserProfile } from "lib/airtable/user-profile";
import { useEffect, useState } from "react";

export type MutableUserProfile = Pick<
  UserProfile,
  "name" | "skills" | "notificationFlags" | "availableInDistricts"
>;

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [updating, setUpdating] = useState(true);

  const loadProfile = async () => {
    setUpdating(true);
    setProfile(await getUserProfile());
    setUpdating(false);
  };

  const updateProfile = async (updates: Partial<MutableUserProfile>) => {
    if (profile) {
      const originalValue = profile;
      setUpdating(true);
      setProfile({ ...profile, ...updates });
      const success = await updateUserProfile(updates);
      if (!success) {
        setProfile(originalValue);
      }
      setUpdating(false);
    } else {
      console.error("Can’t update user profile, value not loaded yet.");
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return {
    profile,
    isUpdating: updating,
    updateProfile,
  } as const;
}

const getUserProfile = async (): Promise<UserProfile | null> =>
  await fetch("/profile/me")
    .then((response) => response.json())
    .catch((e) => null);

const updateUserProfile = async (updates: Partial<MutableUserProfile>) =>
  await fetch("/profile/me", {
    method: "PATCH",
    body: JSON.stringify(updates, null, 2),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.ok)
    .catch((e) => false);
