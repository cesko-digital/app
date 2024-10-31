"use client";

import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import { assertIsOurUser } from "~/src/utils";

/** Is the user with given ID currently signed in? */
export const useCurrentUser = (id: string) => {
  const { data: session } = useSession();
  const [isCurrentUser, setCurrentUser] = useState(false);
  useEffect(() => {
    if (session?.user) {
      assertIsOurUser(session.user);
      setCurrentUser(session.user.id === id);
    }
  }, [session, id]);
  return isCurrentUser;
};
