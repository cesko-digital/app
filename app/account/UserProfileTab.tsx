import {
  useEffect,
  useState,
  type DetailedHTMLProps,
  type HTMLInputTypeAttribute,
  type InputHTMLAttributes,
} from "react";
import Link from "next/link";

import clsx from "clsx";

import { AvatarUploader } from "~/app/account/AvatarUploader";
import { CopyToClipboardButton } from "~/components/CopyToClipboardButton";
import { DistrictSelect } from "~/components/districts/DistrictSelect";
import { FormError } from "~/components/form/FormError";
import { usePatchedJSONResource } from "~/components/hooks/resource";
import { OccupationSelect } from "~/components/profile/OccupationSelect";
import { SenioritySelect } from "~/components/profile/SenioritySelect";
import { SkillSelect } from "~/components/profile/SkillSelect";
import { type UserProfile } from "~/src/data/user-profile";
import { setFlag } from "~/src/flags";
import { absolute, Route } from "~/src/routing";
import { looksLikeEmailAdress } from "~/src/utils";

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
  } = usePatchedJSONResource<UserProfile>({ url: "/account/me" });

  return (
    <div className="flex flex-col gap-10">
      <BasicInfoSection model={model} updating={updating} onChange={setModel} />
      <PrivacySection model={model} updating={updating} onChange={setModel} />
      <DetailedInfoSection
        model={model}
        updating={updating}
        onChange={setModel}
      />
    </div>
  );
};

const BasicInfoSection = ({ model, updating, onChange }: SectionProps) => {
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
          value={model?.email ?? ""}
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

      <InputWithSaveButton
        id="name"
        label="Celé jméno:"
        saveButtonLabel="Uložit jméno"
        disabled={!model || updating}
        defaultValue={model?.name}
        onSave={(name) => onChange({ ...model!, name })}
      />

      <AvatarUploader
        currentImageUrl={model?.profilePictureUrl}
        onImageChange={(profilePictureUrl) =>
          // TBD: Handle deletion
          onChange({ ...model!, profilePictureUrl })
        }
      />

      <InputWithSaveButton
        id="contactMail"
        type="email"
        label="Veřejný kontaktní e-mail:"
        saveButtonLabel="Uložit e-mail"
        defaultValue={model?.contactEmail}
        disabled={!model || updating}
        onSave={(contactEmail) => onChange({ ...model!, contactEmail })}
        validator={(value) =>
          !looksLikeEmailAdress(value)
            ? "V e-mailové adrese je nějaká chyba."
            : null
        }
      />

      <InputWithSaveButton
        id="bio"
        label="Řekni něco málo o sobě, ať tě lidé lépe poznají:"
        saveButtonLabel="Uložit text"
        defaultValue={model?.bio}
        disabled={!model || updating}
        placeholder="zájmy, profesní historie, čemu se chceš věnovat, …"
        onSave={(bio) => onChange({ ...model!, bio })}
        rows={3}
      />
    </section>
  );
};

const DetailedInfoSection = ({ model, updating, onChange }: SectionProps) => (
  <section className="flex max-w-prose flex-col gap-7">
    <h2 className="typo-title2">Řekni nám o sobě víc</h2>

    <SkillSelect
      onChange={(tags) => onChange({ ...model!, tags })}
      value={model?.tags ?? ""}
      disabled={updating}
    />

    <SenioritySelect
      onChange={(maxSeniority) => onChange({ ...model!, maxSeniority })}
      value={model?.maxSeniority}
      disabled={updating}
    />

    <OccupationSelect
      onChange={(occupation) => onChange({ ...model!, occupation })}
      occupation={model?.occupation}
      disabled={updating}
    />

    <InputWithSaveButton
      onSave={(organizationName) => onChange({ ...model!, organizationName })}
      id="organizationName"
      label="Název organizace, kde působíš:"
      saveButtonLabel="Uložit organizaci"
      placeholder="název firmy, neziskové organizace, státní instituce, …"
      defaultValue={model?.organizationName}
      disabled={!model || updating}
    />

    <InputWithSaveButton
      onSave={(profileUrl) => onChange({ ...model!, profileUrl })}
      id="professionalProfile"
      type="url"
      label="Odkaz na tvůj web nebo profesní profil:"
      saveButtonLabel="Uložit odkaz"
      defaultValue={model?.profileUrl}
      disabled={!model || updating}
    />

    <DistrictSelect
      value={model?.availableInDistricts ?? ""}
      onChange={(availableInDistricts) =>
        onChange({ ...model!, availableInDistricts })
      }
    />
  </section>
);

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
            checked={!!model?.privacyFlags.includes("enablePublicProfile")}
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

//
// Shared Code
//

type InputWithSaveButtonProps = {
  id: string;
  label: string;
  saveButtonLabel?: string;
  disabled?: boolean;
  placeholder?: string;
  onSave: (validatedValue: string) => void;
  defaultValue?: string;
  validator?: (value: string) => string | null;
  rows?: number;
  type?: Extract<HTMLInputTypeAttribute, "text" | "email" | "url">;
};

const InputWithSaveButton = (props: InputWithSaveButtonProps) => {
  const {
    id,
    label,
    saveButtonLabel = "Uložit",
    disabled = false,
    placeholder,
    onSave,
    defaultValue = "",
    validator,
    rows = 1,
    type = "text",
  } = props;

  const [pendingChanges, setPendingChanges] = useState(false);
  const [validationError, setValidationError] = useState<string | null>();
  const [newValue, setNewValue] = useState("");

  const canSubmit = pendingChanges && !disabled && !validationError;

  useEffect(() => {
    setNewValue(defaultValue ?? "");
    setPendingChanges(false);
  }, [defaultValue, id]);

  // This horrific type makes it easier to share the code for a
  // single-line `input` and a `textarea` in a type-safe manner. Sorry!
  type SharedProps = Pick<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    | "id"
    | "className"
    | "defaultValue"
    | "placeholder"
    | "disabled"
    | "onChange"
  >;

  const sharedProps = {
    id,
    defaultValue,
    placeholder,
    disabled,
    className: "mb-1 block w-full rounded-md border-2 border-gray p-2",
    onChange: (e: { target: { value: string } }) => {
      const newValue = e.target.value;
      setNewValue(newValue);
      setPendingChanges(true);
      if (validator) {
        setValidationError(validator(newValue));
      }
    },
  } satisfies SharedProps;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="block">
        {label}
      </label>

      <div>
        {rows === 1 && <input type={type} {...sharedProps} />}
        {rows > 1 && <textarea rows={rows} {...sharedProps} />}
        {validationError && (
          <div className="py-1">
            <FormError error={validationError} />
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => {
            onSave(newValue);
            setPendingChanges(false);
          }}
          className={clsx(canSubmit ? "btn-primary" : "btn-disabled")}
          disabled={!canSubmit}
        >
          {saveButtonLabel}
        </button>
      </div>
    </div>
  );
};
