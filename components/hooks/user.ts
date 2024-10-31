"use client";

import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import { assertIsOurUser, type OurUser } from "~/src/utils";

/** Is the user with given ID currently signed in? */
export const useIsCurrentUser = (id: string) => {
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

export const useSignedInUser = () => {
  const { data: session, status: sessionStatus } = useSession();
  const [signedInUser, setSignedInUser] = useState<OurUser | undefined>();
  useEffect(() => {
    if (sessionStatus === "authenticated" && session?.user) {
      assertIsOurUser(session.user);
      setSignedInUser(session.user);
    } else {
      setSignedInUser(undefined);
    }
  }, [session, sessionStatus]);
  return signedInUser;
};
