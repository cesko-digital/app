"use client";

import { Fragment, useState } from "react";

import clsx from "clsx";
import { signIn } from "next-auth/react";

import { trackCustomEvent } from "~/src/plausible/events";
import { Route } from "~/src/routing";
import { looksLikeEmailAdress } from "~/src/utils";

type Props = {
  callbackUrl?: string;
  error?: string;
  email?: string;
};

export const SignInForm = (props: Props) => {
  const { callbackUrl, error } = props;
  const [email, setEmail] = useState(props.email ?? "");
  const [submitting, setSubmitting] = useState(false);

  const disabled = submitting || !email || !looksLikeEmailAdress(email);

  const handleMailSignIn = async () => {
    setSubmitting(true);
    trackCustomEvent("SignIn", { props: { method: "email" } });
    await signIn("email", { email, callbackUrl });
  };

  const handleSlackSignIn = async () => {
    trackCustomEvent("SignIn", { props: { method: "slack" } });
    await signIn("slack", { callbackUrl });
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        return handleMailSignIn();
      }}
    >
      <label htmlFor="user-email" className="block text-balance">
        Zadej e-mail, kterým ses registroval*a nebo kterým se přihlašuješ do
        Slacku Česko.Digital:
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
        <p className="mb-2 bg-yellow p-2 text-left">
          {describeError({ error, email })}
        </p>
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
        <a className="typo-link" onClick={handleSlackSignIn}>
          Přihlásit přes Slack
        </a>
      </p>
    </form>
  );
};

/** See error constants described at https://next-auth.js.org/configuration/pages#sign-in-page */
const describeError = ({ error, email }: { error: string; email: string }) => {
  switch (error.toLocaleLowerCase()) {
    // This is our custom error
    case "usernotfound":
      return (
        <Fragment>
          Tenhle mail neznáme. Buď zkus jiný,{" "}
          <a href={Route.register(email)} className="typo-link">
            anebo se můžeš registrovat
          </a>
          .
        </Fragment>
      );
    case "callback":
      return "Přihlášení skončilo chybou (chybový kód „Callback“). Pokud šlo o přihlášení mailem, není možné, že na tenhle přihlašovací odkaz už někdo kliknul?";
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
