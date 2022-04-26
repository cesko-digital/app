import { Button } from "components/buttons";
import { Body } from "components/typography";
import { SubscriptionState, subscriptionStates } from "lib/ecomail";
import { useEffect, useState } from "react";
import { record, union } from "typescript-json-decoder";

export type Props = {
  getSubscription: () => Promise<SubscriptionState>;
  subscribe: () => Promise<void>;
  unsubscribe: () => Promise<void>;
};

export type State =
  | { tag: "loading" }
  | { tag: "loaded"; subscriptionState: SubscriptionState }
  | { tag: "load_failed" };

export const NewsletterPrefs: React.FC = () => {
  const [state, setState] = useState<State>({ tag: "loading" });

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch("/api/protected/newsletter_subscription");
        const subscription = decodeResponse(await response.json());
        setState({ tag: "loaded", subscriptionState: subscription.state });
      } catch (e) {
        console.error(e);
        setState({ tag: "load_failed" });
      }
    };
    console.log("Loading subscription state.");
    fetchStatus();
  }, []);

  switch (state.tag) {
    case "loading":
      return <Body>Odběr newsletteru: zjišťuji stav…</Body>;
    case "loaded":
      switch (state.subscriptionState) {
        case "subscribed":
          return (
            <div>
              <Body>Jste přihlášeni k odběru měsíčního newsletteru.</Body>
              <Button
                onClick={() => console.log("TBD")}
                style={{ marginTop: "40px", marginBottom: "40px" }}
                inverted
              >
                Odhlásit newsletter
              </Button>
            </div>
          );
        case "unsubscribed":
          return (
            <>
              <Body>Nejste přihlášeni k odběru měsíčního newsletteru.</Body>
              <Button
                onClick={() => console.log("TBD")}
                style={{ marginTop: "40px", marginBottom: "40px" }}
                inverted
              >
                Přihlásit k odběru
              </Button>
            </>
          );
        default:
          return <p>TBD</p>;
      }
    case "load_failed":
      return (
        <Body>
          Stav newsletteru se nepovedlo načíst. Zkuste obnovit stránku?
        </Body>
      );
  }
};

const decodeSubscriptionState = union(...subscriptionStates);
const decodeResponse = record({ state: decodeSubscriptionState });
