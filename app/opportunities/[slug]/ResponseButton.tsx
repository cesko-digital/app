"use client";

import { useSignedInUser } from "~/components/hooks/user";
import { SidebarCTA } from "~/components/Sidebar";
import { type Opportunity } from "~/src/data/opportunity";

type Props = {
  role: Pick<Opportunity, "responseUrl" | "prefillUserId">;
};

export const ResponseButton = ({ role }: Props) => {
  const signedInUser = useSignedInUser();
  if (
    role.prefillUserId &&
    role.responseUrl.startsWith("https://") &&
    signedInUser
  ) {
    // If we have a valid session and the response URL is an ordinary
    // HTTPS URL, add current user ID to the response URL.
    const responseUrl = new URL(role.responseUrl);
    responseUrl.searchParams.append("prefill_User", signedInUser.id);
    responseUrl.searchParams.append("hide_User", "true");
    return <SidebarCTA href={responseUrl.toString()} label="Mám zájem ✨" />;
  } else {
    // Otherwise just use the response URL from the database.
    return <SidebarCTA href={role.responseUrl} label="Mám zájem" />;
  }
};
