"use client";

import { useSession } from "next-auth/react";

import { SidebarCTA } from "~/components/Sidebar";
import { type Opportunity } from "~/src/data/opportunity";
import { assertIsOurUser } from "~/src/utils";

type Props = {
  role: Pick<Opportunity, "responseUrl" | "prefillUserId">;
};

export const ResponseButton = ({ role }: Props) => {
  const { data: session, status: sessionStatus } = useSession();
  if (
    role.prefillUserId &&
    sessionStatus === "authenticated" &&
    session.user &&
    role.responseUrl.startsWith("https://")
  ) {
    // If we have a valid session and the response URL is an ordinary
    // HTTPS URL, add current user ID to the response URL.
    assertIsOurUser(session.user);
    const responseUrl = new URL(role.responseUrl);
    responseUrl.searchParams.append("prefill_User", session.user.id);
    responseUrl.searchParams.append("hide_User", "true");
    return <SidebarCTA href={responseUrl.toString()} label="Mám zájem ✨" />;
  } else {
    // Otherwise just use the response URL from the database.
    return <SidebarCTA href={role.responseUrl} label="Mám zájem" />;
  }
};
