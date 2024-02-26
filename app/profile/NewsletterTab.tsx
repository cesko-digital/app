"use client";

import { Fragment } from "react";

import { useJSONResource } from "~/components/hooks/resource";
import {
  decodeNewsletterPreferences,
  mainPreferenceGroupOptions,
  type MainPreferenceGroupOption,
} from "~/src/ecomail";

const groupDescriptions: Record<MainPreferenceGroupOption, string> = {
  "číst.digital":
    "Jednou měsíčně shrnutí všech nejdůležitějších věcí, které se staly.",
  "náborový newsletter (č.d+)":
    "Jednou za dva měsíce přehled možností, kde a jak se v komunitě můžeš zapojit.",
  "neziskový newsletter":
    "Jednou za 2–3 měsíce informace pro neziskovky o tom, jak s námi spolupracovat, přehled akcí a webinářů, …",
  "jen to nejdůležitější":
    "Jednou za čas největší milníky, například narozeniny nebo jiné velké akce.",
};

type Props = { userMail: string };

export const NewsletterTab = ({ userMail }: Props) => {
  const { model, setModel, updating } = useJSONResource({
    url: "/profile/newsletters",
    decoder: decodeNewsletterPreferences,
  });

  const disablePolicyControls = updating;
  const disableGroupControls = updating || !model?.subscribe;

  // Use empty prefs when value is missing to simplify code below
  const prefs = model ?? {
    subscribe: false,
    subscribedGroups: [],
  };

  return (
    <div className="flex flex-col gap-4">
      <Section>
        <p className="mb-4">
          K odběru našich newsletterů je třeba odsouhlasit{" "}
          <a
            href="https://cesko.digital/go/newsletter-privacy"
            className="typo-link"
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
                setModel({
                  ...prefs,
                  subscribe: e.target.checked,
                })
              }
            ></input>
            Souhlasím, posílejte!
          </label>
        </div>
      </Section>

      <Section>
        <p className="mb-4">
          Které naše newslettery chceš na {userMail} dostávat?
        </p>
        <div className="mb-7">
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
                    setModel({
                      ...prefs,
                      subscribedGroups: updatedGroups,
                    });
                  }}
                ></input>
                {name}
              </label>
              <div className="typo-caption mb-2 ml-6">
                {groupDescriptions[name]}
              </div>
            </Fragment>
          ))}
        </div>
        <HelpInfo userMail={userMail} />
      </Section>
    </div>
  );
};

const HelpInfo = ({ userMail }: { userMail: string }) => {
  return (
    <p className="typo-caption mb-10 max-w-prose">
      Nastavení se týká adresy, kterou se přihlašuješ do Slacku ({userMail}).
      Pokud si chceš newslettery přihlásit na jinou adresu, můžeš využít{" "}
      <a
        href="https://cesko.digital/go/newsletters"
        className="typo-link"
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
  <section className="max-w-prose">{children}</section>
);
