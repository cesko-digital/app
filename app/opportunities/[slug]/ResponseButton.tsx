"use client";

import { useEffect, useState } from "react";

import { record, string } from "typescript-json-decoder";

import { useSignedInUser } from "~/components/hooks/user";
import { SidebarCTA } from "~/components/Sidebar";
import { type Opportunity } from "~/src/data/opportunity";

type Props = {
  role: Pick<Opportunity, "responseUrl" | "prefillUserId">;
};

export const ResponseButton = ({ role }: Props) => {
  const signedInUser = useSignedInUser();
  const [translatedUserId, setTranslatedUserId] = useState<
    string | undefined
  >();

  const shouldPrefill =
    role.prefillUserId && role.responseUrl.startsWith("https://");

  useEffect(() => {
    if (!shouldPrefill || !signedInUser) {
      return;
    }
    const decodeResponse = record({ targetUserId: string });
    async function fetchTranslatedId() {
      return fetch(`/api/translate-user-id?formUrl=${role.responseUrl}`)
        .then((response) => response.json())
        .then(decodeResponse)
        .then((response) => setTranslatedUserId(response.targetUserId))
        .catch((e) => console.error(e));
    }
    void fetchTranslatedId();
  }, [signedInUser, role.responseUrl, shouldPrefill]);

  if (shouldPrefill && signedInUser && translatedUserId) {
    // We have everything we need to add the user ID into the response URL
    const responseUrl = new URL(role.responseUrl);
    responseUrl.searchParams.append("prefill_User", translatedUserId);
    responseUrl.searchParams.append("hide_User", "true");
    return <SidebarCTA href={responseUrl.toString()} label="Mám zájem ✨" />;
  } else if (shouldPrefill) {
    // We would like to add the user ID to the response URL, but we don’t have it yet
    return <SidebarCTA href="" label="Malý moment…" disabled />;
  } else {
    // We don’t want to prefill anything, just use the response URL from the DB
    return <SidebarCTA href={role.responseUrl} label="Mám zájem" />;
  }
};
