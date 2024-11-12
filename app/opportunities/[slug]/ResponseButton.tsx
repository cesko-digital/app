"use client";

import { useEffect, useState } from "react";

import { signIn, useSession } from "next-auth/react";
import { record, string } from "typescript-json-decoder";

import { useSignedInUser } from "~/components/hooks/user";
import { SidebarCTA } from "~/components/Sidebar";
import { type Opportunity } from "~/src/data/opportunity";

type Props = {
  role: Pick<Opportunity, "responseUrl" | "prefillUserId" | "requireSignIn">;
};

export const ResponseButton = ({ role }: Props) => {
  const { status: sessionStatus } = useSession();
  const translatedUserId = useTranslatedUserId(role.responseUrl);

  const shouldPrefill =
    role.prefillUserId && role.responseUrl.startsWith("https://");

  const prefillUserId = (responseUrl: string, userId: string) => {
    const prefilledUrl = new URL(responseUrl);
    prefilledUrl.searchParams.append("prefill_User", userId);
    prefilledUrl.searchParams.append("hide_User", "true");
    return prefilledUrl.toString();
  };

  const { requireSignIn } = role;

  if (requireSignIn && shouldPrefill) {
    //
    // 1. Both sign-in and prefill are on. This is expected to be the
    // default for most use cases – users are required to sign in and after
    // that we pass their ID to the form.
    //
    if (sessionStatus === "loading") {
      return <LoadingSpinner />;
    } else if (sessionStatus === "unauthenticated") {
      return <SignInButton />;
    } else if (!translatedUserId) {
      // TBD: If we fail to translate the user ID we’re stuck here forever
      return <LoadingSpinner />;
    } else {
      return (
        <SidebarCTA
          href={prefillUserId(role.responseUrl, translatedUserId)}
          label="Mám zájem ✨"
        />
      );
    }
  } else if (!requireSignIn && shouldPrefill) {
    //
    // 2. Prefill is on, but sign-in is optional. If the user is signed in,
    // we pass their ID to the form. Not sure if this is going to be used in
    // practice.
    //
    if (sessionStatus === "loading") {
      return <LoadingSpinner />;
    } else if (sessionStatus === "unauthenticated" || !translatedUserId) {
      return <SidebarCTA href={role.responseUrl} label="Mám zájem" />;
    } else {
      return (
        <SidebarCTA
          href={prefillUserId(role.responseUrl, translatedUserId)}
          label="Mám zájem ✨"
        />
      );
    }
  } else if (requireSignIn && !shouldPrefill) {
    //
    // 3. Sign-in is required, but user ID is not passed to the form. This may be
    // handy for fully custom forms where you don’t want any autofilling, but
    // want to be sure users sign in (and therefore accept our general T&C)
    // before filling the form.
    //
    if (sessionStatus === "authenticated") {
      return <SidebarCTA href={role.responseUrl} label="Mám zájem 🔓" />;
    } else if (sessionStatus === "unauthenticated") {
      return <SignInButton />;
    } else {
      return <LoadingSpinner />;
    }
  } else {
    // 4. No fancy processing needed, just use the response URL from the DB
    return <SidebarCTA href={role.responseUrl} label="Mám zájem" />;
  }
};

const LoadingSpinner = () => (
  <SidebarCTA href="" label="Malý moment…" disabled />
);

const SignInButton = () => (
  <div className="flex flex-col gap-2">
    <button className="btn-primary block text-center" onClick={() => signIn()}>
      Mám zájem 🔒
    </button>
    <p className="typo-caption text-balance text-center">
      Pokud máš o nabízenou roli zájem, musíš se nejdřív přihlásit nebo
      registrovat.
    </p>
  </div>
);

function useTranslatedUserId(responseUrl: string) {
  const signedInUser = useSignedInUser();
  const [translatedId, setTranslatedId] = useState<string | undefined>();

  useEffect(() => {
    if (!signedInUser) {
      return;
    }
    const decodeResponse = record({ targetUserId: string });
    async function fetchTranslatedId() {
      return fetch(`/api/translate-user-id?formUrl=${responseUrl}`)
        .then((response) => response.json())
        .then(decodeResponse)
        .then((response) => setTranslatedId(response.targetUserId))
        .catch((e) => console.error(e));
    }
    void fetchTranslatedId();
  }, [signedInUser, responseUrl]);

  return translatedId;
}
