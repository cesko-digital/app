"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { signIn } from "next-auth/react";
import { boolean, record } from "typescript-json-decoder";

import { DistrictSelect } from "~/components/districts/DistrictSelect";
import { SkillPicker } from "~/components/SkillPicker";
import { trackCustomEvent } from "~/src/plausible/events";
import { encodeSkillSelection, type SkillMenu } from "~/src/skills/skills";
import skillMenu from "~/src/skills/skills.json";
import { ContentType, looksLikeEmailAdress } from "~/src/utils";

import ArrowIllustration from "./arrows.svg";
import {
  emptyFormState,
  validateForm,
  type FormState,
  type RegistrationData,
} from "./form-state";

type Props = {
  defaultEmail?: string;
};

/** Main sign-up form */
export const SignUpForm = ({ defaultEmail }: Props) => {
  const [state, setState] = useState<FormState>({
    ...emptyFormState,
    email: defaultEmail ?? "",
  });

  // Check if entered e-mail already exists, and if so, offer to sign in instead
  useEffect(() => {
    const email = state.email;
    if (looksLikeEmailAdress(email)) {
      const _ = isEmailAlreadyRegistered(email).then((emailAlreadyTaken) => {
        setState((state) => ({ ...state, emailAlreadyTaken }));
      });
    }
  }, [state.email]);

  // When submitted, create new user account, log page conversion and redirect to e-mail sign-in
  const submit = async (validatedData: RegistrationData) => {
    try {
      setState({ ...state, submissionState: { tag: "submitting" } });
      const success = await createUserProfile(validatedData);
      if (!success) {
        throw "Nepodařilo se založit uživatelský účet.";
      }
      setState({
        ...state,
        submissionState: { tag: "submitted_successfully" },
      });
      trackCustomEvent("SignUp");
      await signIn("email", { email: validatedData.email, callbackUrl: "/" });
    } catch (error) {
      setState({
        ...state,
        submissionState: { tag: "submission_error", msg: `${error}` },
      });
    }
  };

  return (
    <div className="flex flex-col gap-10 pt-7">
      <IntroSection />
      <PersonalDetailsSection state={state} onChange={setState} />
      <SkillSection skillMenu={skillMenu} state={state} onChange={setState} />
      <PrivacySection state={state} onChange={setState} />
      <LegalSection state={state} onChange={setState} />
      <SubmitSection state={state} onChange={setState} onSubmit={submit} />
    </div>
  );
};

type FormSectionProps = {
  state: FormState;
  onChange: (updatedState: FormState) => void;
};

type FormSection = React.FC<FormSectionProps>;

const isEditable = (state: FormState) => {
  const tag = state.submissionState.tag;
  return tag === "not_submitted_yet" || tag === "submission_error";
};

//
// Intro section
//

const IntroSection = () => (
  <section className="relative">
    <div className="absolute right-[100px] hidden lg:block">
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      <Image src={ArrowIllustration} alt="" width={181} height={373} />
    </div>
    <div className="flex max-w-prose flex-col gap-7">
      <h1 className="typo-title">Staň se členem komunity</h1>
      <p>
        Prozraď nám o sobě více. Budeme tak vědět, co by tě z našich aktivit
        mohlo zajímat a kdo z komunity se na tebe může případně obrátit. Údaje o
        sobě si pak budeš moci kdykoliv upravit na svém profilu.
      </p>
      <p>
        Položky označené ve formuláři hvězdičkou
        <RequiredFieldMarker /> jsou povinné.
      </p>
    </div>
  </section>
);

//
// Personal details
//

const PersonalDetailsSection: FormSection = ({ state, onChange }) => {
  const disabled = !isEditable(state);
  return (
    <section>
      <div className="flex max-w-prose flex-col gap-7">
        <h2 className="typo-title2">To nejdůležitější o tobě</h2>
        <TextInput
          id="name"
          label="Jméno a příjmení"
          value={state.name}
          autoComplete="name"
          onChange={(name) => onChange({ ...state, name })}
          disabled={disabled}
          required
        />
        <div>
          <TextInput
            id="email"
            label="Email"
            value={state.email}
            autoComplete="email"
            onChange={(email) => onChange({ ...state, email })}
            disabled={disabled}
            required
          />
          {state.emailAlreadyTaken && (
            <EmailAlreadyExistsError email={state.email} />
          )}
        </div>
        <OccupationSelect state={state} onChange={onChange} />
        <TextInput
          id="organization"
          label="Název organizace, kde působíš"
          value={state.organizationName}
          placeholder="název firmy, neziskové organizace, státní instituce, …"
          autoComplete="organization"
          disabled={disabled}
          onChange={(organizationName) =>
            onChange({ ...state, organizationName })
          }
        />
        <TextInput
          id="profile"
          label="Odkaz na tvůj web nebo profesní profil"
          placeholder="například LinkedIn, GitHub, Behance, About.me, …"
          value={state.profileUrl}
          type="url"
          disabled={disabled}
          onChange={(profileUrl) => onChange({ ...state, profileUrl })}
        />
        <div>
          <label>Ve kterých okresech ČR býváš k zastižení?</label>
          <DistrictSelect
            value={state.availableInDistricts}
            onChange={(availableInDistricts) =>
              onChange({ ...state, availableInDistricts })
            }
          />
          <p className="typo-caption mt-2">
            Tahle data sbíráme, abychom mohli propojovat členy komunity z
            různých koutů Česka. Jestli nechceš, klidně nech pole nevyplněné.
          </p>
        </div>
        <TextArea
          id="bio"
          label="Řekni něco málo o sobě, ať tě lidé lépe poznají"
          value={state.bio}
          placeholder="zájmy, profesní historie, čemu se chceš věnovat, …"
          disabled={disabled}
          onChange={(bio) => onChange({ ...state, bio })}
        />
      </div>
    </section>
  );
};

const EmailAlreadyExistsError = ({ email }: { email: string }) => {
  return (
    <p className="mt-2 bg-yellow p-2">
      Účet s tímhle mailem už existuje.{" "}
      <a
        onClick={async (e) => {
          e.preventDefault();
          await signIn("email", { email });
        }}
        className="typo-link"
        href=""
      >
        Chceš se přihlásit?
      </a>
    </p>
  );
};

const OccupationSelect: FormSection = ({ state, onChange }) => {
  const options = {
    "private-sector": "Pracuji v soukromém sektoru",
    "non-profit": "Pracuji v neziskové organizaci",
    state: "Pracuji ve státním sektoru",
    freelancing: "Jsem na volné noze/freelancer",
    studying: "Studuji",
    "parental-leave": "Jsem na rodičovské",
    "looking-for-job": "Hledám práci",
    other: "Jiné",
  };

  return (
    <div>
      <label className="mb-1 block">
        Čemu se aktuálně věnuješ?
        <RequiredFieldMarker />
      </label>
      <p className="typo-caption mb-3">
        Pokud toho děláš víc, vyber, co převažuje
      </p>

      <div>
        {Object.entries(options).map(([id, label]) => (
          <label key={id} className="mb-1 flex items-center">
            <input
              type="radio"
              className="mr-3"
              name="occupation"
              disabled={!isEditable(state)}
              checked={state.occupation === id}
              onChange={() => onChange({ ...state, occupation: id })}
            />
            <span className={state.occupation === id ? "font-bold" : ""}>
              {label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

//
// Skills section
//

type SkillSectionProps = FormSectionProps & {
  skillMenu: SkillMenu;
};

const SkillSection: React.FC<SkillSectionProps> = ({
  state,
  skillMenu,
  onChange,
}) => {
  return (
    <section>
      <div className="flex max-w-prose flex-col gap-4">
        <h2 className="typo-title2">
          Dovednosti, které můžeš komunitě nabídnout
          <RequiredFieldMarker />
        </h2>
        <p>
          Díky co nejpřesnějšímu vyplnění tvého zaměření a úrovně zkušeností tě
          může někdo z komunity poprosit o radu nebo tě zapojit do správného
          typu aktivity nebo projektu. Vyplň vše, co tě zajímá, včetně oblastí,
          ve kterých se chceš rozvíjet.
        </p>
        <SkillPicker
          skillMenu={skillMenu}
          selection={state.skills}
          disabled={!isEditable(state)}
          onChange={(skills) => onChange({ ...state, skills })}
        />
      </div>
    </section>
  );
};

//
// Privacy section
//

const PrivacySection: React.FC<FormSectionProps> = ({ state, onChange }) => {
  return (
    <section>
      <div className="flex max-w-prose flex-col gap-4">
        <h2 className="typo-title2">Soukromí</h2>

        <label className="flex items-center">
          <Checkbox
            checked={state.enablePublicProfile}
            disabled={!isEditable(state)}
            onChange={(enablePublicProfile) =>
              onChange({ ...state, enablePublicProfile })
            }
          />
          <div>
            <span>Chci mít veřejný profil</span>
            <p className="typo-caption mt-1 text-balance">
              Budeš veřejně vidět v seznamu uživatelů a kdokoliv si bude moct
              prohlédnout třeba tvé projekty nebo kontakt. Doporučujeme,
              zjednodušuje to vzájemné propojování.
            </p>
          </div>
        </label>
      </div>
    </section>
  );
};

//
// Legal section
//

const LegalSection: FormSection = ({ state, onChange }) => (
  <section>
    <div className="flex max-w-prose flex-col gap-2">
      <h2 className="typo-title2 mb-2">
        Právní náležitosti
        <RequiredFieldMarker />
      </h2>
      <label className="flex items-center">
        <Checkbox
          checked={state.cocConsent}
          disabled={!isEditable(state)}
          onChange={(cocConsent) => onChange({ ...state, cocConsent })}
        />
        <span>
          Mám přečtená{" "}
          <a className="typo-link" href="https://www.cesko.digital/pravidla">
            pravidla chování v komunitě
          </a>{" "}
          a zavazuji se k jejich dodržování.
        </span>
      </label>
      <label className="flex items-center">
        <Checkbox
          checked={state.gdprConsent}
          disabled={!isEditable(state)}
          onChange={(gdprConsent) => onChange({ ...state, gdprConsent })}
        />
        <span>
          Mám přečtené{" "}
          <a className="typo-link" href="https://cesko.digital/go/gdpr">
            zásady přístupu k datům
          </a>{" "}
          a zavazuji se k jejich dodržování.
        </span>
      </label>
      <label className="flex items-center">
        <Checkbox
          checked={state.privacyConsent}
          disabled={!isEditable(state)}
          onChange={(privacyConsent) => onChange({ ...state, privacyConsent })}
        />
        <span>
          Vím, jak bude Česko.Digital při vzájemné spolupráci a pro zajištění
          transparentnosti zpracovávat mé{" "}
          <a className="typo-link" href="https://cesko.digital/go/privacy">
            osobní údaje
          </a>
          .
        </span>
      </label>
    </div>
  </section>
);

//
// Submit section
//

type SubmitSectionProps = FormSectionProps & {
  onSubmit?: (validatedData: RegistrationData) => Promise<void>;
};

const SubmitSection: React.FC<SubmitSectionProps> = ({
  state,
  onSubmit = (_) => {},
}) => {
  const validationResult = validateForm(state);
  const { submissionState } = state;

  const enableSubmitButton =
    validationResult.result === "success" &&
    submissionState.tag !== "submitting" &&
    submissionState.tag !== "submitted_successfully";

  const submitButtonLabel =
    submissionState.tag === "submitting"
      ? "Malý moment…"
      : submissionState.tag === "submitted_successfully"
        ? "Úspěšně odesláno 🎉"
        : "Založit účet a přihlásit";

  const handleSubmit = () => {
    if (validationResult.result === "success") {
      if (onSubmit) {
        onSubmit(validationResult.validatedData);
      } else {
        console.log(
          `Submitted form data: ${JSON.stringify(
            validationResult.validatedData,
            null,
            2,
          )}`,
        );
      }
    } else {
      console.error(
        "Trying to submit form with validation errors, this should not happen.",
      );
    }
  };

  return (
    <section>
      <div className="flex max-w-prose flex-col gap-4">
        {validationResult.result === "error" && state !== emptyFormState && (
          <p className="text-red-500" data-testid="form-error">
            {validationResult.msg}
          </p>
        )}
        {submissionState.tag === "submission_error" && (
          <p className="text-red-500" data-testid="form-error">
            {submissionState.msg}
          </p>
        )}
        <div>
          <button
            onClick={handleSubmit}
            disabled={!enableSubmitButton}
            className={enableSubmitButton ? "btn-primary" : "btn-disabled"}
          >
            {submitButtonLabel}
          </button>
        </div>
      </div>
    </section>
  );
};

//
// Shared Components
//

const RequiredFieldMarker = () => <span className="pl-1 text-red-500">*</span>;

type TextInputProps = {
  id: string;
  label: string;
  type?: "text" | "email" | "url";
  value?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (newValue: string) => void;
};

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  type = "text",
  value = undefined,
  placeholder = undefined,
  required = false,
  disabled = false,
  autoComplete,
  onChange = (_) => {},
}) => {
  return (
    <div>
      <label htmlFor={id}>
        {label}
        {required && <RequiredFieldMarker />}
      </label>
      <input
        id={id}
        required={required}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        type={type}
        className="w-full rounded-md border-2 border-gray p-2"
        onChange={(e) => onChange(e.target.value)}
      ></input>
    </div>
  );
};

type CheckboxProps = {
  checked: boolean;
  disabled: boolean;
  onChange: (newValue: boolean) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({ checked, disabled, onChange }) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      className="mr-3 mt-2 shrink-0 self-start"
      onChange={(e) => onChange(e.target.checked)}
    ></input>
  );
};

type TextAreaProps = {
  id: string;
  label: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  cols?: number;
  onChange?: (newValue: string) => void;
};

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  value = undefined,
  placeholder = undefined,
  required = false,
  disabled = false,
  rows = 3,
  onChange = (_) => {},
}) => {
  return (
    <div>
      <label htmlFor={id}>
        {label}
        {required && <RequiredFieldMarker />}
      </label>
      <textarea
        id={id}
        required={required}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className="w-full rounded-md border-2 border-gray p-2"
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
    </div>
  );
};

//
// I/O
//

async function createUserProfile(data: RegistrationData): Promise<boolean> {
  const payload = { ...data, skills: encodeSkillSelection(data.skills) };
  try {
    const response = await fetch("/account/me", {
      method: "POST",
      body: JSON.stringify(payload, null, 2),
      headers: { "Content-Type": ContentType.json },
    });
    return response.ok;
  } catch (e) {
    console.error(e);
    return false;
  }
}

async function isEmailAlreadyRegistered(email: string): Promise<boolean> {
  const decodeResponse = record({ userExists: boolean });
  return await fetch(`/join/check-email?${new URLSearchParams({ email })}`)
    .then((response) => response.json())
    .then(decodeResponse)
    .then((response) => response.userExists)
    .catch(() => false);
}
