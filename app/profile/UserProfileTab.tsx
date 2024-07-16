import { useEffect, useState } from "react";

import clsx from "clsx";

import { usePatchedJSONResource } from "~/components/hooks/resource";
import { SkillPicker } from "~/components/SkillPicker";
import { type UserProfile } from "~/src/data/user-profile";
import {
  decodeSkillSelection,
  encodeSkillSelection,
  type SkillSelection,
} from "~/src/skills/skills";
import skills from "~/src/skills/skills.json";

type SectionProps = {
  model?: UserProfile;
  updating: boolean;
  onChange: (newState: UserProfile) => void;
};

// TBD: In the long term we probably want to share more of this code
// with the sign-up form if possible, maybe at the section level?
export const UserProfileTab = () => {
  const { model, updating, setModel } = usePatchedJSONResource<UserProfile>({
    url: "/profile/me",
    writeKeys: ["skills", "bio"],
  });

  return (
    <div className="flex flex-col gap-10">
      <BioSection model={model} updating={updating} onChange={setModel} />
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
      <p>Řekni něco málo o sobě, ať tě lidé lépe poznají:</p>
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

const SkillSection = ({ model, updating, onChange }: SectionProps) => {
  const selection = model ? decodeSkillSelection(model.skills) : {};

  // TBD: Batch updates without blocking the UI?
  const onSelectionChange = (selection: SkillSelection) => {
    onChange({ ...model!, skills: encodeSkillSelection(selection) });
  };

  return (
    <section>
      <p className="mb-4 max-w-prose">
        Co chceš v Česko.Digital dělat? Dej nám to vědět, ať ti můžeme různými
        kanály nabízet relevantnější příležitosti.
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
