import { useState } from "react";

import { usePatchedJSONResource } from "~/components/hooks/resource";
import { SkillPicker } from "~/components/SkillPicker";
import { type UserProfile } from "~/src/data/user-profile";
import {
  decodeSkillSelection,
  encodeSkillSelection,
  type SkillSelection,
} from "~/src/skills/skills";
import skills from "~/src/skills/skills.json";

export const SkillsTab = () => {
  const { model, updating, setModel } = usePatchedJSONResource<UserProfile>({
    url: "/profile/me",
    writeKeys: ["skills", "bio"],
  });

  const defaultBio = model?.bio ?? "";

  const [actualBio, setActualBio] = useState({
    bio: defaultBio,
    submissionState: "no_changes",
  });

  const selection = model ? decodeSkillSelection(model.skills) : {};

  // TBD: Batch updates without blocking the UI?
  const onSelectionChange = (selection: SkillSelection) => {
    setModel({ ...model!, skills: encodeSkillSelection(selection) });
  };

  const enableSubmitButton =
    actualBio.submissionState !== "no_changes" &&
    actualBio.submissionState !== "submitted_successfully";

  const submitButtonLabel =
    actualBio.submissionState === "no_changes"
      ? "Uložit změny"
      : actualBio.submissionState === "submitted_successfully"
        ? "Úspěšně uloženo 🎉"
        : "Uložit změny";

  return (
    <section className="mb-10">
      <p className="mb-4">Řekni něco málo o sobě, ať tě lidé lépe poznají</p>
      <textarea
        className="block w-full rounded-md border-2 border-gray p-2"
        defaultValue={actualBio.bio}
        onChange={(e) =>
          setActualBio(() => ({
            submissionState: "",
            bio: e.target.value,
          }))
        }
        placeholder="Čemu se věnuješ? Co tě baví? Do jakých projektů tě láká se zapojit?"
      />

      <button
        onClick={() => {
          setModel({
            ...model!,
            bio: actualBio.bio,
          }),
            setActualBio((prevState) => ({
              ...prevState,
              submissionState: "submitted_successfully",
            }));
        }}
        className={
          enableSubmitButton
            ? "btn-primary mb-10 mt-2 block"
            : "btn-disabled mb-10 mt-2 block"
        }
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
