import { Button } from "components/buttons";
import { Body } from "components/typography";
import { SubscriptionState } from "lib/ecomail";
import { useEffect, useState } from "react";

export type Props = {
  getSubscription: () => Promise<SubscriptionState>;
  subscribe: () => Promise<void>;
  unsubscribe: () => Promise<void>;
};

export type State =
  | { tag: "loading" }
  | { tag: "loaded"; subscriptionState: SubscriptionState }
  | { tag: "load_failed" }
  | { tag: "subscribing" }
  | { tag: "unsubscribing" };

export const NewsletterPrefs: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>({ tag: "loading" });
  const { subscribe, unsubscribe, getSubscription } = props;

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const subscriptionState = await getSubscription();
        setState({ tag: "loaded", subscriptionState });
      } catch (e) {
        console.error(e);
        setState({ tag: "load_failed" });
      }
    };
    fetchStatus();
  }, [getSubscription]);

  const triggerSubscribe = async () => {
    setState({ tag: "subscribing" });
    try {
      await subscribe();
      setState({ tag: "loaded", subscriptionState: "subscribed" });
    } catch (e) {
      console.error(e);
      setState({ tag: "loaded", subscriptionState: "unsubscribed" });
    }
  };

  const triggerUnsubscribe = async () => {
    setState({ tag: "unsubscribing" });
    try {
      await unsubscribe();
      setState({ tag: "loaded", subscriptionState: "unsubscribed" });
    } catch (e) {
      console.error(e);
      setState({ tag: "loaded", subscriptionState: "subscribed" });
    }
  };

  const subscribedMsg = (
    <Body>Jste přihlášeni k odběru měsíčního newsletteru.</Body>
  );
  const unsubscribedMsg = (
    <Body>Nejste přihlášeni k odběru měsíčního newsletteru.</Body>
  );

  switch (state.tag) {
    case "loading":
      return <Body>Odběr newsletteru: zjišťuji stav…</Body>;
    case "load_failed":
      return (
        <Body>
          Stav newsletteru se nepovedlo načíst. Zkuste obnovit stránku?
        </Body>
      );
    case "loaded":
      switch (state.subscriptionState) {
        case "subscribed":
          return (
            <>
              {subscribedMsg}
              <ActionButton onClick={triggerUnsubscribe} type="unsubscribe" />
            </>
          );
        case "unsubscribed":
          return (
            <>
              {unsubscribedMsg}
              <ActionButton onClick={triggerSubscribe} type="subscribe" />
            </>
          );
        default:
          return (
            <Body>
              Newsletter máte v nějakém zvláštním stavu (
              <code>{state.subscriptionState}</code>). Můžete se ozvat v kanálu
              #support?
            </Body>
          );
      }
    case "subscribing":
      return (
        <>
          {unsubscribedMsg}
          <ActionButton type="subscribe" loading />
        </>
      );
    case "unsubscribing":
      return (
        <>
          {subscribedMsg}
          <ActionButton type="unsubscribe" loading />
        </>
      );
  }
};

type ActionButtonProps = {
  type: "subscribe" | "unsubscribe";
  onClick?: () => {};
  loading?: boolean;
};

const ActionButton: React.FC<ActionButtonProps> = ({
  type,
  onClick = undefined,
  loading = false,
}) => {
  const regularLabel =
    type === "subscribe" ? "Přihlásit k odběru" : "Odhlásit newsletter";
  const loadingLabel = type === "subscribe" ? "Přihlašuji…" : "Odhlašuji…";
  return (
    <Button
      onClick={onClick}
      style={{ marginTop: "40px", marginBottom: "40px" }}
      disabled={loading}
      inverted
    >
      {loading ? loadingLabel : regularLabel}
    </Button>
  );
};
