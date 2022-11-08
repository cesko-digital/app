import { Layout } from "components/layout";
import { useEffect, useState } from "react";
import {
  SkillMenu,
  SkillSelection,
  SkillPicker,
} from "components/user-profile/skill-picker";

export type SubmissionState =
  | { tag: "not_submitted_yet" }
  | { tag: "submitting" }
  | { tag: "submitted_successfully" }
  | { tag: "submission_error"; msg: string };

type FormState = {
  name: string;
  email: string;
  occupation?: string;
  organizationName: string;
  profileUrl: string;
  skills: SkillSelection;
  legalConsent: boolean;
  submissionState: SubmissionState;
};

export type RegistrationData = {
  name: string;
  email: string;
  skills: SkillSelection;
  occupation?: string;
  organizationName?: string;
  profileUrl?: string;
};

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

  // Fill default values on repeated Shift press
  useEffect(() => {
    let shiftCount = 0;
    const handlePress = (event: KeyboardEvent) => {
      if (event.key === "Shift") {
        shiftCount = (shiftCount + 1) % 5;
        if (shiftCount === 4) {
          console.log("Filling-in debugging values.");
          setState((state) => ({ ...state, ...debugFormDefaults }));
        }
      } else {
        shiftCount = 0;
      }
    };
    document.addEventListener("keydown", handlePress);
    return (/* cleanup */) => {
      document.removeEventListener("keydown", handlePress);
    };
  }, []);

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

//
// Form support
//

type FormSectionProps = {
  state: FormState;
  onChange: (updatedState: FormState) => void;
};

type FormSection = React.FC<FormSectionProps>;

type ValidationResult =
  | { result: "success"; validatedData: RegistrationData }
  | { result: "error"; msg: string };

function validateForm(data: FormState): ValidationResult {
  const { name, email, skills, legalConsent } = data;
  const error = (msg: string) => ({ result: "error" as const, msg });
  if (!name) {
    return error("Je třeba vyplnit jméno.");
  } else if (!email) {
    return error("Je třeba vyplnit email.");
  } else if (Object.entries(skills).length === 0) {
    return error("Je třeba vyplnit aspoň jednu dovednost.");
  } else if (!legalConsent) {
    return error("Je třeba odsouhlasit podmínky zpracování osobních údajů.");
  } else {
    const { occupation, organizationName, profileUrl } = data;
    return {
      result: "success",
      validatedData: {
        name,
        email,
        skills,
        organizationName,
        occupation,
        profileUrl,
      },
    };
  }
}

const isEditable = (state: FormState) => {
  const tag = state.submissionState.tag;
  return tag === "not_submitted_yet" || tag === "submission_error";
};

const emptyFormState: FormState = {
  name: "",
  email: "",
  organizationName: "",
  profileUrl: "",
  skills: {},
  legalConsent: false,
  submissionState: { tag: "not_submitted_yet" },
};

const debugFormDefaults: Partial<FormState> = {
  name: "Tomáš Znamenáček",
  email: "zoul@cesko.digital",
  occupation: "non-profit",
  organizationName: "Česko.Digital",
  profileUrl: "https://github.com/zoul",
  legalConsent: true,
  skills: {
    Vývoj: { Frontend: "senior", Backend: "medior", React: "junior" },
  },
};

//
// Intro section
//

const Intro = () => (
  <Section>
    <SectionContent>
      <h1 className="text-[44px] font-bold leading-snug mb-10">
        Staň se členem komunity
      </h1>
      <p>
        Abychom věděli, co by tě z našich aktivit mohlo zajímat a kdo se na tebe
        může z komunity obrátit, řekni nám prosím něco o sobě. Osobní údaje a
        dovednostní preference si pak budeš moci kdykoliv upravit ve svém
        profilu na Portálu dobrovolníka.
      </p>
      <p>
        Položky označené hvězdičkou
        <RequiredFieldMarker /> jsou povinné.
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
  };

  return (
    <>
      <label>Čemu se aktuálně věnuješ</label>
      <p className="text-base mt-1 text-gray-500">
        Vyber prosím svoji hlavní činnost. U některých možností tě můžeme v
        uvítacím e-mailu kontaktovat s dalšími podrobnostmi ohledně případné
        spolupráce (například u neziskovek či soukromého sektoru).
      </p>

      <div className="mb-8">
        {Object.entries(options).map(([id, label]) => (
          <label key={id} className="block">
            <input
              type="radio"
              className="mr-2"
              name="occupation"
              checked={state.occupation === id}
              onChange={() => onChange({ ...state, occupation: id })}
            />
            {label}
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
        <h2>Dovednosti, které můžeš komunitě nabídnout</h2>
        <p>
          Díky co nejpřesnějšímu vyplnění tvého zaměření a úrovně zkušeností tě
          může (ale nemusí) někdo z komunity poprosit o radu nebo tě zapojit do
          správného typu aktivity nebo projektu.
        </p>
        <p>
          Nechceš čekat, až ti někdo napíše? Stačí se podívat na vhodné
          příležitosti na{" "}
          <a href="https://cesko.digital/dashboard">Portálu dobrovolníka</a>.
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
      <h2>
        Abychom s informacemi od tebe mohli dále pracovat, tak tě prosíme o:
      </h2>
      <label className="flex items-center">
        <input
          type="checkbox"
          defaultChecked={state.legalConsent}
          disabled={!isEditable(state)}
          className="mr-2"
          onChange={(e) =>
            onChange({ ...state, legalConsent: e.target.checked })
          }
        ></input>
        <span>
          Souhlas se{" "}
          <a href="https://cesko.digital/go/privacy">
            zpracováním osobních údajů
          </a>
        </span>
        <RequiredFieldMarker />
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
        <h2>Co tě čeká po odeslání formuláře</h2>
        <ol className="mb-8 list-decimal space-y-4 list-inside xl:list-outside">
          <li>
            Pro začátek dostaneš{" "}
            <b>všechny potřebné informace v souhrnném uvítacím e-mailu</b>.
          </li>
          <li>
            Přesměrujeme tě také rovnou na{" "}
            <b>registrační stránku komunikačního nástroje Slack</b>. U nás se
            bez něho neobejdeš. Veškerá komunikace probíhá právě tam. Stačí se
            zaregistrovat a můžeš začít hledat nové příležitosti a kontakty nebo
            sledovat dění v komunitě.
          </li>
        </ol>
        {validationResult.result === "error" && (
          <p className="text-red-500">{validationResult.msg}</p>
        )}
        {submissionState.tag === "submission_error" && (
          <p className="text-red-500">{submissionState.msg}</p>
        )}
        <button
          onClick={handleSubmit}
          disabled={!enableSubmitButton}
          className={
            enableSubmitButton
              ? "btn-primary"
              : "btn-disabled cursor-not-allowed"
          }
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

const Section: React.FC = ({ children }) => (
  <section className="relative max-w-content m-auto mt-10 pb-10 px-5 text-lg last:mb-10">
    {children}
  </section>
);

const SectionContent: React.FC = ({ children }) => (
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
