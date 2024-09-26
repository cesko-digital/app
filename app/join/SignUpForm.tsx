"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { signIn } from "next-auth/react";
import { boolean, record } from "typescript-json-decoder";

import { DistrictSelect } from "~/components/districts/DistrictSelect";
import { FormError } from "~/components/form/FormError";
import { RequiredFieldMarker } from "~/components/form/RequiredFieldMarker";
import { OccupationSelect } from "~/components/profile/OccupationSelect";
import { SenioritySelect } from "~/components/profile/SenioritySelect";
import { SkillSelect } from "~/components/profile/SkillSelect";
import { trackCustomEvent } from "~/src/plausible/events";
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
        throw new Error("Nepodařilo se založit uživatelský účet.");
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
      <BasicInfoSection state={state} onChange={setState} />
      <ProfileDetailSection state={state} onChange={setState} />
      <LegalSection state={state} onChange={setState} />
      <SubmitSection state={state} onChange={setState} onSubmit={submit} />
    </div>
  );
};

type FormSectionProps = {
  state: FormState;
  onChange: (updatedState: FormState) => void;
};

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
      <h1 className="typo-title">Přidej se k nám</h1>
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
// Basic Info
//

const BasicInfoSection = ({ state, onChange }: FormSectionProps) => {
  const disabled = !isEditable(state);
  return (
    <section>
      <div className="flex max-w-prose flex-col gap-7">
        <h2 className="typo-title2">To nejdůležitější o tobě</h2>

        <div>
          <TextInput
            id="email"
            label="Registrační e-mail:"
            value={state.email}
            autoComplete="email"
            onChange={(email) => onChange({ ...state, email })}
            disabled={disabled}
            required
          />
          {state.emailAlreadyTaken && (
            <EmailAlreadyExistsError email={state.email} />
          )}
          <p className="typo-caption mt-2 text-balance">
            Slouží pro přihlašování, nebudeme ho nikde ukazovat veřejně.
          </p>
        </div>

        <TextInput
          id="name"
          label="Celé jméno:"
          value={state.name}
          autoComplete="name"
          onChange={(name) => onChange({ ...state, name })}
          disabled={disabled}
          required
        />

        <TextArea
          id="bio"
          label="Řekni něco málo o sobě, ať tě lidé lépe poznají:"
          value={state.bio}
          placeholder="zájmy, profesní historie, čemu se chceš věnovat, …"
          disabled={disabled}
          onChange={(bio) => onChange({ ...state, bio })}
        />

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

//
// Details
//

const ProfileDetailSection = ({ state, onChange }: FormSectionProps) => {
  const disabled = !isEditable(state);
  return (
    <section>
      <div className="flex max-w-prose flex-col gap-7">
        <h2 className="typo-title2">Řekni nám víc</h2>

        <SkillSelect
          value={state.tags}
          onChange={(tags) => onChange({ ...state, tags })}
          sendChangesImmediately={true}
        />

        <SenioritySelect
          onChange={(maxSeniority) => onChange({ ...state, maxSeniority })}
          value={state.maxSeniority}
          disabled={!isEditable(state)}
        />

        <OccupationSelect
          onChange={(occupation) => onChange({ ...state, occupation })}
          occupation={state.occupation}
          disabled={!isEditable(state)}
        />

        <TextInput
          id="organization"
          label="Název organizace, kde působíš:"
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
          label="Odkaz na tvůj web nebo profesní profil:"
          placeholder="například LinkedIn, GitHub, Behance, About.me, …"
          value={state.profileUrl}
          type="url"
          disabled={disabled}
          onChange={(profileUrl) => onChange({ ...state, profileUrl })}
        />

        <DistrictSelect
          value={state.availableInDistricts}
          onChange={(availableInDistricts) =>
            onChange({ ...state, availableInDistricts })
          }
        />
      </div>
    </section>
  );
};

//
// Legal section
//

const LegalSection = ({ state, onChange }: FormSectionProps) => (
  <section>
    <div className="flex max-w-prose flex-col gap-4">
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
        <span className="text-balance">
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
        <span className="text-balance">
          Mám přečtené{" "}
          <a
            className="typo-link"
            href="https://drive.google.com/file/d/1yXtDFLr4Y_apubpc1GmUmdHUnnasCsuw/view?usp=sharing"
          >
            směrnice o ochraně osobních údajů a bezpečnosti dat
          </a>{" "}
          a zavazuji se k jejich dodržování.
        </span>
      </label>
      <label className="flex items-center">
        <Checkbox
          checked={state.privacyConsent}
          disabled={!isEditable(state)}
          onChange={(privacyConsent) => onChange({ ...state, privacyConsent })}
        />
        <span className="text-balance">
          Vím, jak bude Česko.Digital při vzájemné spolupráci a pro zajištění
          transparentnosti zpracovávat mé{" "}
          <a
            className="typo-link"
            href="https://docs.google.com/document/d/1G7jYaHuz8_TbfsGqseKIvzDj7u03VfnkKnk1s6lnPqI/edit"
          >
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

const SubmitSection = ({ state, onSubmit }: SubmitSectionProps) => {
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
        return onSubmit(validationResult.validatedData);
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
          <FormError error={validationResult.msg} />
        )}
        {submissionState.tag === "submission_error" && (
          <FormError error={submissionState.msg} />
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

const TextInput = ({
  id,
  label,
  type = "text",
  value = undefined,
  placeholder = undefined,
  required = false,
  disabled = false,
  autoComplete,
  onChange = (_) => {},
}: TextInputProps) => {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block">
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

const Checkbox = ({ checked, disabled, onChange }: CheckboxProps) => {
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

const TextArea = ({
  id,
  label,
  value = undefined,
  placeholder = undefined,
  required = false,
  disabled = false,
  rows = 3,
  onChange = (_) => {},
}: TextAreaProps) => {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block">
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
  try {
    const response = await fetch("/account/me", {
      method: "POST",
      body: JSON.stringify(data, null, 2),
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
