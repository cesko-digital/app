"use client";

import { useJSONResource } from "~/components/hooks/resource";
import { type Event } from "~/src/data/event";

type RegistrationStatus = {
  registered: boolean;
};

export const QuickRegistrationButton = ({ event }: { event: Event }) => {
  const url = `/events/${event.slug}/registration-status`;
  const { model, setModel, updating } = useJSONResource<RegistrationStatus>({
    url,
  });
  if (updating) {
    return <a className="btn-disabled block text-center">Moment…</a>;
  } else if (model?.registered) {
    return (
      <a
        className="btn-destructive block text-center"
        onClick={() => setModel({ registered: false })}
      >
        Zrušit registraci
      </a>
    );
  } else {
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
