"use client";

import { Fragment, useState } from "react";

import clsx from "clsx";
import { signIn } from "next-auth/react";

import { trackCustomEvent } from "~/src/plausible/events";
import { Route } from "~/src/routing";
import { looksLikeEmailAdress } from "~/src/utils";

/** Custom sign-in page, see documentation at https://next-auth.js.org/configuration/pages */
const Page = () => {
  const params = new URLSearchParams(document.location.search);
  const error = params.get("error");

  const [email, setEmail] = useState(params.get("email") ?? "");
  const [submitting, setSubmitting] = useState(false);

  // We need to relay the original callback URL to the sign-in process,
  // otherwise it would redirect to the sign-in page after successful sign-in.
  const callbackUrl = params.get("callbackUrl") ?? "/";

  const disabled = submitting || !email || !looksLikeEmailAdress(email);

  const handleMailSignIn = async () => {
    setSubmitting(true);
    trackCustomEvent("SignIn");
    await signIn("email", { email, callbackUrl });
  };

  return (
    <Fragment>
      <h1 className="typo-title">Přihlásit se</h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          return handleMailSignIn();
        }}
      >
        <label htmlFor="user-email" className="block">
          Zadej e-mail, kterým se přihlašuješ do Slacku Česko.Digital:
        </label>
        <input
          id="user-email"
          defaultValue={email}
          className="block w-full rounded-md border-2 border-gray p-2"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        ></input>
        {error && (
          <p className="mb-2 bg-yellow p-2 text-left">{describeError(error)}</p>
        )}
        <button
          className={clsx(
            "m-auto inline-block",
            disabled ? "btn-disabled" : "btn-primary",
          )}
          disabled={disabled}
          onClick={handleMailSignIn}
        >
          {!submitting && "Pošli mi přihlašovací odkaz"}
          {submitting && "Malý moment…"}
        </button>
        <p className="typo-caption mt-4">
          <a
            className="typo-link"
            onClick={() => signIn("slack", { callbackUrl })}
          >
            Přihlásit přes Slack
          </a>
        </p>
      </form>
    </Fragment>
  );
};

/** See error constants described at https://next-auth.js.org/configuration/pages#sign-in-page */
const describeError = (error: string) => {
  switch (error) {
    // This is our custom error
    case "UserNotFound":
      return (
        <Fragment>
          Tenhle mail neznáme. Buď zkus jiný,{" "}
          <a href={Route.register} className="typo-link">
            anebo se můžeš registrovat
          </a>
          .
        </Fragment>
      );
    default:
      return (
        <Fragment>
          Během přihlášení došlo k chybě (kód {error}). Pardon – zkus to prosím
          ještě jednou a kdyby se to nezlepšilo,{" "}
          <a href="mailto:pomoc@cesko.digital" className="typo-link">
            ozvi se nám prosím
          </a>
          .
        </Fragment>
      );
  }
};

export default Page;
