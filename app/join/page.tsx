"use client";

import { useState } from "react";
import Image from "next/image";

import { Breadcrumbs } from "~/components/Breadcrumbs";
import { DistrictSelect } from "~/components/districts/DistrictSelect";
import { SkillPicker } from "~/components/SkillPicker";
import { trackCustomEvent } from "~/src/plausible/events";
import { Route } from "~/src/routing";
import { encodeSkillSelection, type SkillMenu } from "~/src/skills";
import { ContentType } from "~/src/utils";

import ArrowIllustration from "./arrows.svg";
import {
  emptyFormState,
  validateForm,
  type FormState,
  type RegistrationData,
} from "./form-state";
import skillMenu from "./skills.json";

const Page = () => {
  const [state, setState] = useState(emptyFormState);

  // When submitted, create new user account, log page conversion and redirect to Slack onboarding
  const submit = async (validatedData: RegistrationData) => {
    try {
      setState({ ...state, submissionState: { tag: "submitting" } });
      const success = await createUserProfile(validatedData);
      if (!success) {
        throw "Nepodařilo se založit uživatelský účet.";
      }
      trackCustomEvent("SignUp");
      setTimeout(() => {
        document.location.href = Route.slackOnboarding;
      }, 1000);
      setState({
        ...state,
        submissionState: { tag: "submitted_successfully" },
      });
    } catch (error) {
      setState({
        ...state,
        submissionState: { tag: "submission_error", msg: `${error}` },
      });
    }
  };

  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs
        path={[{ label: "Homepage", path: "/" }]}
        currentPage="Registrace"
      />
      <div className="flex flex-col gap-10 pt-7">
        <IntroSection />
        <PersonalDetailsSection state={state} onChange={setState} />
        <SkillSection skillMenu={skillMenu} state={state} onChange={setState} />
        <LegalSection state={state} onChange={setState} />
        <SubmitSection state={state} onChange={setState} onSubmit={submit} />
      </div>
    </main>
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
      <h2 className="typo-title2">Co tě čeká po odeslání formuláře</h2>
      <ol className="list-inside list-decimal space-y-4 xl:list-outside">
        <li>
          Pro začátek dostaneš{" "}
          <b>všechny potřebné informace v souhrnném uvítacím e-mailu</b>.
        </li>
        <li>
          Přesměrujeme tě také rovnou na{" "}
          <b>registrační stránku komunikačního nástroje Slack</b>. U nás se bez
          něho (zatím) neobejdeš. Veškerá komunikace probíhá právě tam. Stačí se
          zaregistrovat a můžeš začít hledat nové příležitosti a kontakty nebo
          sledovat dění v komunitě.
        </li>
      </ol>
      <p>
        Položky označené ve formuláři hvězdičkou
        <RequiredFieldMarker /> jsou povinné.
      </p>
      <p>
        PS. Pokud už v našem Slacku jsi a jen jsi od něj zapomněl(a) heslo,
        můžeš si ho resetovat{" "}
        <a
          className="typo-link"
          href="https://slack.com/help/articles/201909068-Reset-your-password"
        >
          podle tohoto návodu
        </a>
        .
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
        <TextInput
          id="email"
          label="Email"
          value={state.email}
          autoComplete="email"
          onChange={(email) => onChange({ ...state, email })}
          disabled={disabled}
          required
        />
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
          <p className="mb-1">Ve kterých okresech ČR býváš k zastižení?</p>
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
      </div>
    </section>
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
        Vyber prosím svoji hlavní činnost. V uvítacím e-mailu tě pak můžeme
        seznámit s dalšími podrobnostmi ohledně případné spolupráce.
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
        <input
          type="checkbox"
          checked={state.cocConsent}
          disabled={!isEditable(state)}
          className="mr-3 mt-2 shrink-0 self-start"
          onChange={(e) => onChange({ ...state, cocConsent: e.target.checked })}
        ></input>
        <span>
          Mám přečtená{" "}
          <a className="typo-link" href="https://cesko.digital/go/coc">
            pravidla chování v komunitě
          </a>{" "}
          a zavazuji se k jejich dodržování.
        </span>
      </label>
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={state.gdprConsent}
          disabled={!isEditable(state)}
          className="mr-3 mt-2 shrink-0 self-start"
          onChange={(e) =>
            onChange({ ...state, gdprConsent: e.target.checked })
          }
        ></input>
        <span>
          Mám přečtené{" "}
          <a className="typo-link" href="https://cesko.digital/go/gdpr">
            zásady přístupu k datům
          </a>{" "}
          a zavazuji se k jejich dodržování.
        </span>
      </label>
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={state.privacyConsent}
          disabled={!isEditable(state)}
          className="mr-3 mt-2 shrink-0 self-start"
          onChange={(e) =>
            onChange({ ...state, privacyConsent: e.target.checked })
          }
        ></input>
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
        : "Odeslat a přejít na Slack";

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

async function createUserProfile(data: RegistrationData): Promise<boolean> {
  const payload = { ...data, skills: encodeSkillSelection(data.skills) };
  try {
    const response = await fetch("/profile/me", {
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

export default Page;
