import { Fragment } from "react";

import { RetryButton } from "./RetryButton";

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
      <RetryButton callbackUrl={callbackUrl} />
    </Fragment>
  );
};

export default Page;
