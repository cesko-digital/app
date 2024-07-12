"use client";

import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";

import { type Session } from "next-auth";
import { signIn, useSession } from "next-auth/react";

import { Route } from "~/src/routing";
import { defaultAvatarUrl } from "~/src/utils";

export const SessionToolbar = () => {
  const { data: session, status } = useSession();
  return (
    <Fragment>
      {status === "loading" && <SignedOutButtons />}
      {status === "unauthenticated" && <SignedOutButtons />}
      {status === "authenticated" && <SignedInButtons session={session} />}
    </Fragment>
  );
};

const SignedInButtons = ({ session }: { session: Session }) => {
  const avatarImage = session.user?.image ?? defaultAvatarUrl;
  const avatarTitle =
    session.user?.name && session.user?.email
      ? `${session.user?.name} (${session.user?.email})`
      : undefined;

  return (
    <div className="flex flex-row gap-7 text-base md:-mb-[3px]">
      <Link
        href={Route.userProfile}
        className="typo-link flex flex-row-reverse items-center gap-4 lg:flex-row"
      >
        <Image
          className="rounded-full bg-gray shadow"
          src={avatarImage}
          alt={session.user?.name ?? "Uživatelský profil"}
          title={avatarTitle}
          width={30}
          height={30}
        />
        Můj profil
      </Link>
    </div>
  );
};

const SignedOutButtons = () => (
  <div className="flex flex-col gap-7 text-base md:flex-row">
    <Link className="typo-link" onClick={() => signIn()} href="">
      Přihlásit se
    </Link>
    <Link className="typo-link" href={Route.register()}>
      Založit účet
    </Link>
  </div>
);
