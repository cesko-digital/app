"use client";

import { Fragment } from "react";
import Link from "next/link";

import { type Session } from "next-auth";
import { signOut } from "next-auth/react";

import { Route } from "~/src/routing";

export const SessionToolbar = ({ session }: { session: Session | null }) => {
  return (
    <div className="ml-auto flex flex-row gap-4">
      {session && (
        <Fragment>
          <span>{session.user?.email}</span>
          <a
            className="typo-link cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Odhlásit
          </a>
        </Fragment>
      )}
      {!session && (
        <Fragment>
          <Link className="typo-link" href={Route.signIn}>
            Přihlásit se
          </Link>
          <Link className="typo-link" href={Route.register}>
            Registrovat
          </Link>
        </Fragment>
      )}
    </div>
  );
};
