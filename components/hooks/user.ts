"use client";

import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import { type OurUser } from "~/src/auth";

/** Is the user with given ID currently signed in? */
export const useCurrentUser = (id: string) => {
  const { data: session } = useSession();
  const [isCurrentUser, setCurrentUser] = useState(false);
  useEffect(() => {
    setCurrentUser((session?.user as OurUser)?.id === id);
  }, [session, id]);
  return isCurrentUser;
};
