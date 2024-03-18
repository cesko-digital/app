import { Fragment } from "react";

import { SignInForm } from "./SignInForm";

type Props = {
  searchParams: {
    error?: string;
    email?: string;
    callbackUrl?: string;
  };
};

/** Custom sign-in page, see documentation at https://next-auth.js.org/configuration/pages */
const Page = ({ searchParams }: Props) => {
  const { error, email, callbackUrl = "/" } = searchParams;
  return (
    <Fragment>
      <h1 className="typo-title">Přihlásit se</h1>
      <SignInForm email={email} error={error} callbackUrl={callbackUrl} />
    </Fragment>
  );
};

export default Page;
