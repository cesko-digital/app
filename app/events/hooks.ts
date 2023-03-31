import { PortalEvent } from "lib/airtable/event";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { boolean, record } from "typescript-json-decoder";

export type EventRegistrationModel =
  | { state: "notSignedIn" }
  | { state: "error" }
  | { state: "updating"; desiredState: boolean }
  | { state: "ready"; registered: boolean };

/**
 * Query and set user registration status for given event.
 *
 * Note that the value also depends on login session state.
 */
export function useEventRegistrationStatus(event: PortalEvent) {
  const { data: session } = useSession();
  const [model, setModel] = useState<EventRegistrationModel>({
    state: "notSignedIn",
  });

  // Read state when event or session change
  useEffect(() => {
    async function loadStatus() {
      const registered = await getRegistrationStatus(event);
      if (registered !== null) {
        setModel({ state: "ready", registered });
      } else {
        setModel({ state: "error" });
      }
    }
    if (session && session.user) {
      loadStatus();
    } else {
      setModel({ state: "notSignedIn" });
    }
  }, [event, session]);

  // Update state
  const updateStatus = async (registered: boolean) => {
    setModel({ state: "updating", desiredState: registered });
    const succeeded = await setRegistrationStatus(event, registered);
    const newValue = succeeded ? registered : !registered;
    setModel({
      state: "ready",
      registered: newValue,
    });
  };

  return [model, updateStatus] as const;
}

const getRegistrationStatus = async (event: PortalEvent) =>
  await fetch(url(event))
    .then((response) => response.json())
    .then(record({ registered: boolean }))
    .then((value) => value.registered)
    .catch((e) => null);

const setRegistrationStatus = async (event: PortalEvent, registered: boolean) =>
  await fetch(url(event), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ registered }),
  }).then((response) => response.ok);

const url = (event: PortalEvent) => `/events/${event.slug}/registration_status`;
