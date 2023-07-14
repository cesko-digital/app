import { Layout } from "components/layout";
import { useState } from "react";
import Image from "next/image";
import { SkillPicker } from "app/profile/skill-picker";
import { SkillMenu } from "lib/skills";
import {
  emptyFormState,
  FormState,
  RegistrationData,
  validateForm,
} from "./form-state";
import { DistrictSelect } from "app/profile/map/select";

export type PageProps = {
  skillMenu: SkillMenu;
  onSubmit?: (data: RegistrationData) => Promise<void>;
};

const OnboardingFormPage: React.FC<PageProps> = ({
  skillMenu,
  onSubmit = () => {},
}) => {
  const [state, setState] = useState<FormState>(emptyFormState);

  // Handle form submission
  const handleSubmit = async (validatedData: RegistrationData) => {
    try {
      setState({ ...state, submissionState: { tag: "submitting" } });
      await onSubmit(validatedData);
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
    <Layout
      crumbs={[
        { label: "Zapojit se", path: "/join" },
        { label: "Registrační formulář" },
      ]}
      head={{
        title: "Staň se členem komunity",
        description: `Staň se součástí Česko.Digital, největší komunity expertních dobrovolníků
            a dobrovolnic. Rádi tě zapojíme do projektů, které tě budou bavit a kde můžeš získat
            nové zkušenosti nebo se podělit o své nápady.`,
      }}
    >
      <Intro />
      <PersonalDetailsSection state={state} onChange={setState} />
      <SkillSection skillMenu={skillMenu} state={state} onChange={setState} />
      <LegalSection state={state} onChange={setState} />
      <SubmitSection
        state={state}
        onChange={setState}
        onSubmit={handleSubmit}
      />
    </Layout>
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

const Intro = () => (
  <Section>
    <SectionContent>
      <div className="hidden lg:block absolute right-[100px]">
        <Image
          src="/images/onboarding/rightward-arrows.svg"
          alt=""
          width={181}
          height={373}
        />
      </div>
      <h1 className="text-[44px] font-bold leading-snug mb-10">
        Staň se členem komunity
      </h1>
      <p>
        Prozraď nám o sobě více. Budeme tak vědět, co by tě z našich aktivit
        mohlo zajímat a kdo z komunity se na tebe může případně obrátit. Údaje o
        sobě si pak budeš moci kdykoliv upravit na svém profilu na Portálu
        dobrovolníka.
      </p>
      <h2>Co tě čeká po odeslání formuláře</h2>
      <ol className="mb-8 list-decimal space-y-4 list-inside xl:list-outside">
        <li>
          Pro začátek dostaneš{" "}
          <b>všechny potřebné informace v souhrnném uvítacím e-mailu</b>.
        </li>
        <li>
          Přesměrujeme tě také rovnou na{" "}
          <b>registrační stránku komunikačního nástroje Slack</b>. U nás se bez
          něho neobejdeš. Veškerá komunikace probíhá právě tam. Stačí se
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
        <a href="https://slack.com/help/articles/201909068-Reset-your-password">
          podle tohoto návodu
        </a>
        .
      </p>
    </SectionContent>
  </Section>
);

//
// Personal details
//

const PersonalDetailsSection: FormSection = ({ state, onChange }) => {
  const disabled = !isEditable(state);
  return (
    <Section>
      <SectionContent>
        <h2>To nejdůležitější o tobě</h2>
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
        <p className="mb-1">Ve kterých okresech ČR býváš k zastižení?</p>
        <DistrictSelect
          value={state.availableInDistricts}
          onChange={(availableInDistricts) =>
            onChange({ ...state, availableInDistricts })
          }
        />
        <p className="text-base text-gray-500 mt-1">
          Tahle data sbíráme, abychom mohli propojovat členy komunity z různých
          koutů Česka. Jestli nechceš, klidně nech pole nevyplněné.
        </p>
      </SectionContent>
    </Section>
  );
};

const OccupationSelect: FormSection = ({ state, onChange }) => {
  const options = {
    "private-sector": "Pracuji v soukromém sektoru",
    "non-profit": "Pracuji v neziskové organizaci",
    "state": "Pracuji ve státním sektoru",
    "freelancing": "Jsem na volné noze/freelancer",
    "studying": "Studuji",
    "parental-leave": "Jsem na rodičovské",
    "looking-for-job": "Hledám práci",
    "other": "Jiné",
  };

  return (
    <>
      <label>
        Čemu se aktuálně věnuješ
        <RequiredFieldMarker />
      </label>
      <p className="text-base mt-1 text-gray-500">
        Vyber prosím svoji hlavní činnost. V uvítacím e-mailu tě pak můžeme
        seznámit s dalšími podrobnostmi ohledně případné spolupráce.
      </p>

      <div className="mb-8">
        {Object.entries(options).map(([id, label]) => (
          <label key={id} className="flex items-center">
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
    </>
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
    <Section>
      <SectionContent>
        <h2>
          Dovednosti, které můžeš komunitě nabídnout
          <RequiredFieldMarker />
        </h2>
        <p>
          Díky co nejpřesnějšímu vyplnění tvého zaměření a úrovně zkušeností tě
          může někdo z komunity poprosit o radu nebo tě zapojit do správného
          typu aktivity nebo projektu.
        </p>
        <SkillPicker
          skillMenu={skillMenu}
          selection={state.skills}
          disabled={!isEditable(state)}
          onChange={(skills) => onChange({ ...state, skills })}
        />
      </SectionContent>
    </Section>
  );
};

//
// Legal section
//

const LegalSection: FormSection = ({ state, onChange }) => (
  <Section>
    <SectionContent>
      <h2>Právní náležitosti</h2>
      <label className="flex items-center mb-2">
        <input
          type="checkbox"
          checked={state.cocConsent}
          disabled={!isEditable(state)}
          className="mr-3 self-start mt-2 shrink-0"
          onChange={(e) => onChange({ ...state, cocConsent: e.target.checked })}
        ></input>
        <span>
          Mám přečtená{" "}
          <a href="https://cesko.digital/go/coc">pravidla chování v komunitě</a>{" "}
          a zavazuji se k jejich dodržování.
          <RequiredFieldMarker />
        </span>
      </label>
      <label className="flex items-center mb-2">
        <input
          type="checkbox"
          checked={state.gdprConsent}
          disabled={!isEditable(state)}
          className="mr-3 self-start mt-2 shrink-0"
          onChange={(e) =>
            onChange({ ...state, gdprConsent: e.target.checked })
          }
        ></input>
        <span>
          Mám přečtené{" "}
          <a href="https://cesko.digital/go/gdpr">zásady přístupu k datům</a> a
          zavazuji se k jejich dodržování.
          <RequiredFieldMarker />
        </span>
      </label>
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={state.privacyConsent}
          disabled={!isEditable(state)}
          className="mr-3 self-start mt-2 shrink-0"
          onChange={(e) =>
            onChange({ ...state, privacyConsent: e.target.checked })
          }
        ></input>
        <span>
          Vím, jak bude Česko.Digital při vzájemné spolupráci a pro zajištění
          transparentnosti zpracovávat mé{" "}
          <a href="https://cesko.digital/go/privacy">osobní údaje</a>.
          <RequiredFieldMarker />
        </span>
      </label>
    </SectionContent>
  </Section>
);

//
// Submit section
//

type SubmitSectionProps = FormSectionProps & {
  onSubmit?: (validatedData: RegistrationData) => void;
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
            2
          )}`
        );
      }
    } else {
      console.error(
        "Trying to submit form with validation errors, this should not happen."
      );
    }
  };

  return (
    <Section>
      <SectionContent>
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
        <button
          onClick={handleSubmit}
          disabled={!enableSubmitButton}
          className={enableSubmitButton ? "btn-primary" : "btn-disabled"}
        >
          {submitButtonLabel}
        </button>
      </SectionContent>
    </Section>
  );
};

//
// Shared Components
//

const RequiredFieldMarker = () => <span className="text-red-500 pl-1">*</span>;

const Section = ({ children }: { children: React.ReactNode }) => (
  <section className="relative max-w-content m-auto mt-10 pb-10 px-5 text-lg last:mb-10">
    {children}
  </section>
);

const SectionContent = ({ children }: { children: React.ReactNode }) => (
  <div className="max-w-prose">{children}</div>
);

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
    <div className="mb-6">
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
        className="rounded-md border-2 border-gray p-2 w-full"
        onChange={(e) => onChange(e.target.value)}
      ></input>
    </div>
  );
};

export default OnboardingFormPage;
