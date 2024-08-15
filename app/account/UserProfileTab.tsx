import { useEffect, useState } from "react";
import Link from "next/link";

import clsx from "clsx";

import { CopyToClipboardButton } from "~/components/CopyToClipboardButton";
import { DistrictSelect } from "~/components/districts/DistrictSelect";
import { usePatchedJSONResource } from "~/components/hooks/resource";
import { SkillPicker } from "~/components/SkillPicker";
import { type UserProfile } from "~/src/data/user-profile";
import { setFlag } from "~/src/flags";
import { absolute, Route } from "~/src/routing";
import {
  decodeSkillSelection,
  encodeSkillSelection,
  type SkillSelection,
} from "~/src/skills/skills";
import skills from "~/src/skills/skills.json";

type SectionProps = {
  model?: UserProfile;
  updating?: boolean;
  onChange: (newState: UserProfile) => void;
};

// TBD: In the long term we probably want to share more of this code
// with the sign-up form if possible, maybe at the section level?
export const UserProfileTab = () => {
  const {
    model: model,
    updating,
    setModel,
  } = usePatchedJSONResource<UserProfile>({
    url: "/account/me",
    writeKeys: [
      "skills",
      "bio",
      "availableInDistricts",
      "privacyFlags",
      "contactEmail",
    ],
  });

  return (
    <div className="flex flex-col gap-10">
      <BioSection model={model} updating={updating} onChange={setModel} />
      <ContactSection model={model} updating={updating} onChange={setModel} />
      <PrivacySection model={model} updating={updating} onChange={setModel} />
      <MapSection model={model} onChange={setModel} />
      <SkillSection model={model} updating={updating} onChange={setModel} />
    </div>
  );
};

const BioSection = ({ model, updating, onChange }: SectionProps) => {
  const [bio, setBio] = useState("");
  const [pendingChanges, setPendingChanges] = useState(false);
  const canSubmit = pendingChanges && !updating;

  useEffect(() => {
    setBio(model?.bio ?? "");
    setPendingChanges(false);
  }, [model]);

  return (
    <section className="flex max-w-prose flex-col gap-7">
      <h2 className="typo-title2">Základní informace</h2>
      <div>
        <a
          className="btn-inverted"
          href={model ? Route.toProfile(model) : undefined}
        >
          Zobrazit profil
        </a>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="registrationEmail" className="block">
          Registrační e-mail:
        </label>
        <input
          id="registrationEmail"
          value={model?.email}
          autoComplete="email"
          disabled
          type="text"
          className="block w-full rounded-md border-2 border-gray bg-pebble p-2"
        ></input>
        <p className="typo-caption">
          Tenhle mail slouží k přihlašování, zasílání notifikací a podobně.
          Nikde ho neukazujeme veřejně (pokud ho níže nezadáš jako veřejný
          kontakt). Pokud ho potřebuješ změnit, ozvi se prosím na{" "}
          <a href="mailto:pomoc@cesko.digital" className="typo-link">
            pomoc@cesko.digital
          </a>
          .
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="bio-textarea" className="block">
          Řekni něco málo o sobě, ať tě lidé lépe poznají:
        </label>
        <textarea
          id="bio-textarea"
          className="mb-2 block w-full rounded-md border-2 border-gray p-2"
          placeholder="Čemu se věnuješ? Co tě baví? Do jakých projektů tě láká se zapojit?"
          rows={3}
          disabled={!model || updating}
          defaultValue={bio}
          onChange={(e) => {
            setBio(e.target.value);
            setPendingChanges(true);
          }}
        />
        <div>
          <button
            onClick={() => onChange({ ...model!, bio })}
            className={clsx(canSubmit ? "btn-primary" : "btn-disabled")}
            disabled={!canSubmit}
          >
            Uložit změny
          </button>
        </div>
      </div>
    </section>
  );
};

const ContactSection = ({ model, updating, onChange }: SectionProps) => {
  const [contactEmail, setContactEmail] = useState("");
  const [pendingChanges, setPendingChanges] = useState(false);
  const canSubmit = pendingChanges && !updating;

  useEffect(() => {
    setContactEmail(model?.bio ?? "");
    setPendingChanges(false);
  }, [model]);

  return (
    <section className="flex max-w-prose flex-col gap-4">
      <h2 className="typo-title2">Kontaktní informace</h2>

      <div className="flex flex-col gap-2">
        <label htmlFor="contactEmail" className="block">
          Veřejný kontaktní e-mail:
        </label>
        <input
          id="contactEmail"
          defaultValue={model?.contactEmail}
          autoComplete="email"
          disabled={updating}
          type="text"
          className="block w-full rounded-md border-2 border-gray p-2"
          onChange={(e) => {
            setContactEmail(e.target.value);
            setPendingChanges(true);
          }}
        ></input>
      </div>

      <div>
        <button
          onClick={() => onChange({ ...model!, contactEmail })}
          className={clsx(canSubmit ? "btn-primary" : "btn-disabled")}
          disabled={!canSubmit}
        >
          Uložit změny
        </button>
      </div>
    </section>
  );
};

const PrivacySection = ({ model, updating, onChange }: SectionProps) => {
  const hasPublicProfile = model?.privacyFlags.includes("enablePublicProfile");

  const Note = ({ children }: { children: React.ReactNode }) => (
    <p className="typo-caption ml-6 mt-1 text-balance">{children}</p>
  );

  return (
    <section className="flex max-w-prose flex-col gap-4">
      <h2 className="typo-title2">Soukromí</h2>
      <p>
        Chceš svůj profil vystavit{" "}
        <Link href={Route.people} className="typo-link">
          veřejně na stránce Lidé
        </Link>
        ? Doporučujeme, zjednodušuje to vzájemné propojování.
      </p>

      <div>
        <label className="flex items-center">
          <input
            checked={model?.privacyFlags.includes("enablePublicProfile")}
            type="checkbox"
            className="mr-3"
            disabled={updating}
            onChange={(e) =>
              onChange({
                ...model!,
                privacyFlags: setFlag(
                  model!.privacyFlags,
                  "enablePublicProfile",
                  e.target.checked,
                ),
              })
            }
          ></input>
          Chci mít veřejný profil
        </label>
        {hasPublicProfile && (
          <div className="flex flex-row items-center gap-2">
            <Note>
              Svůj profil najdeš na{" "}
              <Link
                href={Route.toProfile(model!)}
                className="typo-link"
                target="_blank"
              >
                téhle adrese
              </Link>
            </Note>
            <CopyToClipboardButton
              title="Zkopírovat adresu profilu do schránky"
              value={absolute(Route.toProfile(model!))}
            />
          </div>
        )}
      </div>

      <div>
        <label className="flex items-center">
          <input
            checked={!model?.privacyFlags.includes("hidePublicTeamMembership")}
            type="checkbox"
            className="mr-3"
            disabled={updating}
            onChange={(e) =>
              onChange({
                ...model!,
                privacyFlags: setFlag(
                  model!.privacyFlags,
                  "hidePublicTeamMembership",
                  !e.target.checked,
                ),
              })
            }
          ></input>
          Chci veřejně ukazovat svoje zapojení na projektech
        </label>
        <Note>
          Když se zapojíš do některého z našich projektů, dáme o tom vědět na
          stránce projektu a ve tvém veřejném profilu
        </Note>
      </div>

      <p>Může pár minut trvat, než se změny v těchto nastaveních projeví.</p>
    </section>
  );
};

const MapSection = ({ model, onChange }: SectionProps) => {
  return (
    <section className="flex max-w-prose flex-col gap-4">
      <h2 className="typo-title2">Kde býváš k zastižení?</h2>
      <p>
        Jsme Česko.Digital, ne Praha.Digital :) Jestli chceš, dej nám vědět, ve
        kterých okresech ČR se vyskytuješ, ať můžeme lépe propojit členy a
        členky Česko.Digital z různých koutů Česka.
      </p>
      <div>
        <DistrictSelect
          value={model?.availableInDistricts ?? ""}
          onChange={(availableInDistricts) =>
            onChange({ ...model!, availableInDistricts })
          }
        />
      </div>
    </section>
  );
};

const SkillSection = ({ model, updating, onChange }: SectionProps) => {
  const selection = model ? decodeSkillSelection(model.skills) : {};

  // TBD: Batch updates without blocking the UI?
  const onSelectionChange = (selection: SkillSelection) => {
    onChange({ ...model!, skills: encodeSkillSelection(selection) });
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="typo-title2">Co umíš?</h2>
      <p className="max-w-prose">
        Dej nám to vědět, ať ti můžeme různými kanály nabízet relevantnější
        příležitosti.
      </p>
      <SkillPicker
        skillMenu={skills}
        selection={selection}
        onChange={onSelectionChange}
        disabled={updating}
      />
    </section>
  );
};
