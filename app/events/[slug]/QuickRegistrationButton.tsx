"use client";

import { SessionProvider, useSession } from "next-auth/react";

import { useJSONResource } from "~/components/hooks/resource";
import { expressSignIn } from "~/src/auth";
import { type Event } from "~/src/data/event";

type RegistrationStatus = {
  registered: boolean;
};

const QuickRegistrationButton = ({ event }: { event: Event }) => {
  const { status: sessionStatus } = useSession();
  const url = `/events/${event.slug}/registration-status`;
  const { model, setModel, updating } = useJSONResource<RegistrationStatus>({
    url,
  });
  if (updating || sessionStatus === "loading") {
    // Loading session or updating state
    return <a className="btn-disabled block text-center">Moment…</a>;
  } else if (sessionStatus === "unauthenticated") {
    // Unauthenticated: Use button to sign-in first
    return (
      <a
        className="btn-primary block text-center"
        onClick={() => expressSignIn()}
      >
        Pro registraci se musíš přihlásit
      </a>
    );
  } else if (model?.registered) {
    // Already registered: Offer to cancel
    return (
      <a
        className="btn-destructive block text-center"
        onClick={() => setModel({ registered: false })}
      >
        Zrušit registraci
      </a>
    );
  } else {
    // Not registered: Offer to register
    return (
      <a
        className="btn-primary block text-center"
        onClick={() => setModel({ registered: true })}
      >
        Registrovat
      </a>
    );
  }
};

const SessionWrappedButton = ({ event }: { event: Event }) => (
  <SessionProvider>
    <QuickRegistrationButton event={event} />
  </SessionProvider>
);

export { SessionWrappedButton as QuickRegistrationButton };
