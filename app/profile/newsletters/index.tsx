import { useSession } from "next-auth/react";
import { Fragment } from "react";
import { useNewsletterPrefs } from "./hooks";
import {
  MainPreferenceGroupOption,
  mainPreferenceGroupOptions,
  NewsletterPreferences,
} from "lib/ecomail";

export const NewsletterPrefs = () => {
  const { data: session } = useSession();
  const [model, updateModel] = useNewsletterPrefs();

  const groupDescriptions: Record<MainPreferenceGroupOption, string> = {
    "číst.digital":
      "Jednou měsíčně shrnutí všech nejdůležitějších věcí, které se staly.",
    "náborový newsletter (č.d+)":
      "Jednou za dva měsíce přehled možností, kde a jak se v komunitě můžeš zapojit.",
    "neziskový newsletter":
      "Jednou za 2–3 měsíce informace pro neziskovky o tom, jak s námi spolupracovat, přehled akcí a webinářů, …",
    "jen to nejdůležitější":
      "Jednou za čas největší milníky, například narozeniny nebo jiné velké akce.",
  };

  const disablePolicyControls = model.state !== "ready";
  const disableGroupControls =
    model.state !== "ready" || !model.value.subscribe;

  const emptyPrefs = {
    subscribe: false,
    subscribedGroups: [],
  };

  const prefs: NewsletterPreferences =
    model.state === "ready" || model.state === "updating"
      ? model.value
      : emptyPrefs;

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
              checked={prefs.subscribe}
              type="checkbox"
              className="mr-3"
              disabled={disablePolicyControls}
              onChange={(e) =>
                updateModel({ ...prefs, subscribe: e.target.checked })
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
            <Fragment key={name}>
              <label className="flex items-center">
                <input
                  checked={prefs.subscribedGroups.includes(name)}
                  type="checkbox"
                  className="mr-3"
                  disabled={disableGroupControls}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const updatedGroups = checked
                      ? [...prefs.subscribedGroups, name]
                      : prefs.subscribedGroups.filter((g) => g !== name);
                    updateModel({
                      ...prefs,
                      subscribedGroups: updatedGroups,
                    });
                  }}
                ></input>
                {name}
              </label>
              <div className="ml-6 mb-2 text-base text-gray-500">
                {groupDescriptions[name]}
              </div>
            </Fragment>
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

const Section = ({ children }: { children: React.ReactNode }) => (
  <section className="text-lg max-w-prose">{children}</section>
);
