"use client";

import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";

import { type Session } from "next-auth";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

import { Route } from "~/src/routing";

export default function AuthContext({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}

export const SessionToolbar = () => {
  const { data: session, status } = useSession();
  return (
    <div className="ml-auto flex flex-row items-center gap-4">
      {status === "loading" && "Načítám…"}
      {status === "authenticated" && <SignedInButtons session={session} />}
      {status === "unauthenticated" && <SignedOutButtons />}
    </div>
  );
};

const SignedInButtons = ({ session }: { session: Session }) => {
  const avatarImage =
    session.user?.image ??
    "https://data.cesko.digital/people/generic-profile.jpg";
  const avatarTitle =
    session.user?.name && session.user?.email
      ? `${session.user?.name} (${session.user?.email})`
      : undefined;
  return (
    <Fragment>
      <a
        className="typo-link cursor-pointer"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Odhlásit
      </a>
      <Link href={Route.userProfile}>
        <Image
          className="rounded-full bg-gray shadow"
          src={avatarImage}
          alt={session.user?.name ?? "Uživatelský profil"}
          title={avatarTitle}
          width={40}
          height={40}
        />
      </Link>
    </Fragment>
  );
};

const SignedOutButtons = () => (
  <Fragment>
    <Link className="typo-link" onClick={() => signIn()} href="">
      Přihlásit se
    </Link>
    <Link className="typo-link" href={Route.register()}>
      Registrovat
    </Link>
  </Fragment>
);
