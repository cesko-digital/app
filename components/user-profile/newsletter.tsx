import {
  MainPreferenceGroupOption,
  mainPreferenceGroupOptions,
  NewsletterPreferences,
} from "lib/ecomail";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export type Props = {
  getPreferences: () => Promise<NewsletterPreferences>;
  setPreferences: (preferences: NewsletterPreferences) => Promise<void>;
};

export type Model = {
  state: "updating" | "ready" | "error";
  preferences: NewsletterPreferences;
};

export const NewsletterPrefs: React.FC<Props> = (props) => {
  const emptyPreferences: NewsletterPreferences = {
    subscribe: false,
    subscribedGroups: [],
  };

  const { data: session } = useSession();
  const { getPreferences, setPreferences } = props;
  const [model, setModel] = useState<Model>({
    preferences: emptyPreferences,
    state: "updating",
  });

  // Initial load
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const preferences = await getPreferences();
        setModel({ state: "ready", preferences });
      } catch (e) {
        console.error(e);
        setModel((model) => ({ ...model, state: "error" }));
      }
    };
    fetchStatus();
  }, [getPreferences]);

  // Update
  const updatePreferences = (newPrefs: NewsletterPreferences) => {
    const writeChanges = async () => {
      const originalPrefs = { ...model.preferences };
      try {
        setModel({ state: "updating", preferences: newPrefs });
        await setPreferences(newPrefs);
        setModel((m) => ({ ...m, state: "ready" }));
      } catch (e) {
        console.error(e);
        setModel({ state: "ready", preferences: originalPrefs });
      }
    };
    writeChanges();
  };

  const disablePolicyControls = model.state !== "ready";
  const disableGroupControls =
    model.state !== "ready" || !model.preferences.subscribe;

  const groupDescriptions: Record<MainPreferenceGroupOption, string> = {
    "číst.digital":
      "Jednou měsíčně shrnutí všech nejdůležitějších věcí, které se staly.",
    "náborový newsletter":
      "Jednou za dva měsíce přehled možností, kde a jak se v komunitě můžeš zapojit.",
    "neziskový newsletter":
      "Jednou za 2–3 měsíce informace pro neziskovky o tom, jak s námi spolupracovat, přehled akcí a webinářů, …",
    "jen to nejdůležitější":
      "Jednou za čas největší milníky, například narozeniny nebo jiné velké akce.",
  };

  return (
    <>
      <Section>
        <p>
          K odběru našich newsletterů je třeba odsouhlasit{" "}
          <a
            href="https://cesko.digital/go/newsletter-privacy"
            target="_blank"
            rel="noreferrer"
          >
            podmínky zpracování osobních údajů
          </a>
          . Souhlas můžeš kdykoliv zrušit, odhlásíš tím odběr všech našich
          newsletterů.
        </p>
        <div>
          <label key="policy" className="flex items-center">
            <input
              checked={model.preferences.subscribe}
              type="checkbox"
              className="mr-3"
              disabled={disablePolicyControls}
              onChange={(e) =>
                updatePreferences({
                  ...model.preferences,
                  subscribe: e.target.checked,
                })
              }
            ></input>
            Souhlasím, posílejte!
          </label>
        </div>
      </Section>

      <Section>
        <p>Které naše newslettery chceš na {session?.user?.email} dostávat?</p>
        <div className="mb-10">
          {mainPreferenceGroupOptions.map((name) => (
            <>
              <label key={name} className="flex items-center">
                <input
                  checked={model.preferences.subscribedGroups.includes(name)}
                  type="checkbox"
                  className="mr-3"
                  disabled={disableGroupControls}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const updatedGroups = checked
                      ? [...model.preferences.subscribedGroups, name]
                      : model.preferences.subscribedGroups.filter(
                          (g) => g !== name
                        );
                    updatePreferences({
                      ...model.preferences,
                      subscribedGroups: updatedGroups,
                    });
                  }}
                ></input>
                {name}
              </label>
              <div className="ml-6 mb-2 text-base text-gray-500">
                {groupDescriptions[name]}
              </div>
            </>
          ))}
        </div>
        <HelpInfo />
      </Section>
    </>
  );
};

const HelpInfo = () => {
  const { data: session } = useSession();
  return (
    <p className="text-sm max-w-prose text-gray-500 mb-10">
      Nastavení se týká adresy, kterou se přihlašuješ do Slacku (
      {session?.user?.email}). Pokud si chceš newslettery přihlásit na jinou
      adresu, můžeš využít{" "}
      <a
        href="https://cesko.digital/go/newsletters"
        className="text-gray-500"
        target="_blank"
        rel="noreferrer"
      >
        tenhle formulář
      </a>
      . A pokud chceš upravit odběr našich newsletterů na jiné adrese, můžeš to
      udělat prostřednictvím odkazu v patičce každého z našich newsletterů.
    </p>
  );
};

const Section: React.FC = ({ children }) => (
  <section className="text-lg max-w-prose">{children}</section>
);
