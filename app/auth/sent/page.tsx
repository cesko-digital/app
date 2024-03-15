"use client";

import { Fragment } from "react";

import { signIn } from "next-auth/react";

type Props = {
  searchParams: {
    callbackUrl?: string;
  };
};

const Page = ({ searchParams }: Props) => {
  const { callbackUrl = "/" } = searchParams;
  return (
    <Fragment>
      <h1 className="typo-title">Mrkni do pošty 📨</h1>
      <p>
        Na zadaný mail jsme poslali jednorázový přihlašovací odkaz. Kdyby dlouho
        nešel, zkus zkontrolovat složku se spamem a kdyby mail nebyl ani tam,
        zkus to znova. Pokud se někde zasekneš, dej nám vědět na{" "}
        <a href="mailto:pomoc@cesko.digital" className="typo-link">
          pomoc@cesko.digital
        </a>
        , pomůžeme.
      </p>
      <a
        className="btn-inverted m-auto inline-block"
        onClick={() => signIn(undefined, { callbackUrl })}
      >
        Zkusit znova
      </a>
    </Fragment>
  );
};

export default Page;
