import { SubscriptionState } from "lib/ecomail";
import { Component } from "lib/utils";
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

  const subscribedMsg = <p>Jsi přihlášen(a) k odběru měsíčního newsletteru.</p>;
  const unsubscribedMsg = (
    <p>Nejsi přihlášen(a) k odběru měsíčního newsletteru.</p>
  );

  switch (state.tag) {
    case "loading":
      return (
        <Section>
          <p>Odběr newsletteru: zjišťuji stav…</p>
        </Section>
      );
    case "load_failed":
      return (
        <Section>
          <p>Stav newsletteru se nepovedlo načíst. Zkus obnovit stránku?</p>
        </Section>
      );
    case "loaded":
      switch (state.subscriptionState) {
        case "subscribed":
          return (
            <Section>
              {subscribedMsg}
              <ActionButton onClick={triggerUnsubscribe} type="unsubscribe" />
            </Section>
          );
        case "unsubscribed":
          return (
            <Section>
              {unsubscribedMsg}
              <ActionButton onClick={triggerSubscribe} type="subscribe" />
            </Section>
          );
        default:
          return (
            <Section>
              <p>
                Newsletter máš v nějakém zvláštním stavu (
                <code>{state.subscriptionState}</code>). Můžeš se ozvat v kanálu
                #support? Díky!
              </p>
            </Section>
          );
      }
    case "subscribing":
      return (
        <Section>
          {unsubscribedMsg}
          <ActionButton type="subscribe" loading />
        </Section>
      );
    case "unsubscribing":
      return (
        <Section>
          {subscribedMsg}
          <ActionButton type="unsubscribe" loading />
        </Section>
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
  const kind = loading ? "btn-disabled" : "btn-primary";
  return (
    <div className="mt-10 mb-10">
      <button className={kind} onClick={onClick}>
        {loading ? loadingLabel : regularLabel}
      </button>
    </div>
  );
};

const Section: Component = ({ children }) => (
  <section className="text-lg">{children}</section>
);
