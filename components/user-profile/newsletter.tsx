import { SubscriptionState } from "lib/ecomail";
import { useSession } from "next-auth/react";
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
              <HelpInfo />
            </Section>
          );
        case "unsubscribed":
          return (
            <Section>
              {unsubscribedMsg}
              <ActionButton onClick={triggerSubscribe} type="subscribe" />
              <HelpInfo />
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
    <div className="mt-10 mb-5">
      <button className={kind} onClick={onClick}>
        {loading ? loadingLabel : regularLabel}
      </button>
    </div>
  );
};

const HelpInfo = () => {
  const { data: session } = useSession();
  return (
    <p className="text-sm max-w-prose text-gray-500 mb-10">
      Nastavení se týká adresy, kterou se přihlašuješ do Slacku (
      {session?.user?.email}). Pokud si chceš newslettery přihlásit na jinou
      adresu, můžeš využít{" "}
      <a href="https://cesko.digital/go/newsletters" className="text-gray-500">
        tenhle formulář
      </a>
      . A pokud chceš upravit odběr našich newsletterů na jiné adrese, můžeš to
      udělat prostřednictvím odkazu v patičce každého z našich newsletterů.
    </p>
  );
};

const Section: React.FC = ({ children }) => (
  <section className="text-lg">{children}</section>
);
