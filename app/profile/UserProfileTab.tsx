import { useEffect, useState } from "react";
import Link from "next/link";

import clsx from "clsx";

import { DistrictSelect } from "~/components/districts/DistrictSelect";
import { usePatchedJSONResource } from "~/components/hooks/resource";
import { SkillPicker } from "~/components/SkillPicker";
import { type UserProfile } from "~/src/data/user-profile";
import { setFlag } from "~/src/flags";
import { Route } from "~/src/routing";
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
  const { model, updating, setModel } = usePatchedJSONResource<UserProfile>({
    writeKeys: ["skills", "bio", "availableInDistricts", "privacyFlags"],
    url: "/profile/me",
  });

  return (
    <div className="flex flex-col gap-10">
      <BioSection model={model} updating={updating} onChange={setModel} />
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
    <section className="flex flex-col gap-4">
      <h2 className="typo-title2">Základní informace</h2>
      <p>Řekni něco málo o sobě, ať tě lidé lépe poznají.</p>
      <textarea
        className="block w-full max-w-prose rounded-md border-2 border-gray p-2"
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
    </section>
  );
};

export const PrivacySection = ({ model, updating, onChange }: SectionProps) => {
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
      </div>

      <div>
        <label className="flex items-center">
          <input
            checked={model?.privacyFlags.includes("hidePublicTeamMembership")}
            type="checkbox"
            className="mr-3"
            disabled={updating}
            onChange={(e) =>
              onChange({
                ...model!,
                privacyFlags: setFlag(
                  model!.privacyFlags,
                  "hidePublicTeamMembership",
                  e.target.checked,
                ),
              })
            }
          ></input>
          Nechci veřejně ukazovat svoje zapojení na projektech
        </label>
        <p className="typo-caption ml-6 text-balance">
          Pokud se zapojíš do některého z našich projektů, nebudeme to ukazovat
          ani na tvém profilu, ani na stránce projektu
        </p>
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
