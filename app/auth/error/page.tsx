"use client";

import { Fragment } from "react";

import { signIn } from "next-auth/react";

type Props = {
  searchParams: {
    error?: string;
    callbackUrl?: string;
  };
};

/** Custom sign-in error page, see documentation at https://next-auth.js.org/configuration/pages */
const Page = ({ searchParams }: Props) => {
  const { error, callbackUrl = "/" } = searchParams;
  const Code = ({ children }: { children: React.ReactNode }) => (
    <code className="bg-yellow">{children}</code>
  );
  return (
    <Fragment>
      <h1 className="typo-title">Přihlášení se nepodařilo 😞</h1>
      <p>
        Chybový kód je {error ? <Code>{error}</Code> : "neznámý"}. Zkus to
        prosím ještě jednou a kdyby to stále nefungovalo, dej nám prosím vědět
        na{" "}
        <a href="mailto:pomoc@cesko.digital" className="typo-link">
          pomoc@cesko.digital
        </a>
        .
      </p>
      <a
        className="btn-primary m-auto inline-block"
        onClick={() => signIn(undefined, { callbackUrl })}
      >
        Zkusit znova
      </a>
    </Fragment>
  );
};

export default Page;
