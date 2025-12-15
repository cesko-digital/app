"use client";

import { signIn } from "next-auth/react";

import { trackCustomEvent } from "~/src/plausible/events";
import { Route } from "~/src/routing";

export const SignedOutPage = () => {
  const handleSignIn = async () => {
    trackCustomEvent("SignIn");
    await signIn(undefined, { callbackUrl: Route.account });
  };
  return (
    <section className="m-auto mt-10 flex max-w-[80ex] flex-col gap-7 rounded-2xl border-2 border-gray p-7 pb-10 text-center lg:mt-20">
      <p className="pb-4">
        Pro zobrazení uživatelského profilu se musíš přihlásit.
      </p>
      <div>
        <a onClick={handleSignIn} className="btn-primary">
          Přihlásit se
        </a>
      </div>
    </section>
  );
};
