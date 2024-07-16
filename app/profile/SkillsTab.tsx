import { useState } from "react";

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

type BioState = {
  bio: string;
  submissionState: "no_changes" | "changes_done" | "submitted_successfully";
};

export const SkillsTab = () => {
  const { model, updating, setModel } = usePatchedJSONResource<UserProfile>({
    url: "/profile/me",
    writeKeys: ["skills", "bio"],
  });

  const actualBio = model?.bio ?? "";

  const [bioState, setBioState] = useState<BioState>({
    bio: actualBio,
    submissionState: "no_changes",
  });

  const selection = model ? decodeSkillSelection(model.skills) : {};

  // TBD: Batch updates without blocking the UI?
  const onSelectionChange = (selection: SkillSelection) => {
    setModel({ ...model!, skills: encodeSkillSelection(selection) });
  };

  const enableSubmitButton = bioState.submissionState === "changes_done";

  const submitButtonLabel =
    bioState.submissionState === "submitted_successfully"
      ? "Úspěšně uloženo 🎉"
      : "Uložit změny";

  return (
    <section className="mb-10">
      <p className="mb-4">Řekni něco málo o sobě, ať tě lidé lépe poznají</p>
      <textarea
        className="block w-full max-w-prose rounded-md border-2 border-gray p-2"
        rows={3}
        defaultValue={actualBio}
        onChange={(e) =>
          setBioState({
            submissionState: "changes_done",
            bio: e.target.value,
          })
        }
        placeholder="Čemu se věnuješ? Co tě baví? Do jakých projektů tě láká se zapojit?"
      />

      <button
        onClick={() => {
          setModel({
            ...model!,
            bio: bioState.bio,
          });
          setBioState({
            ...bioState,
            submissionState: "submitted_successfully",
          });
        }}
        className={clsx(
          "mb-10 mt-2 block",
          enableSubmitButton ? "btn-primary" : "btn-disabled",
        )}
      >
        {submitButtonLabel}
      </button>

      <p className="mb-4">
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
