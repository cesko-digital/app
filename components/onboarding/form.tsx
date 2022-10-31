import { Layout } from "components/layout";
import { ChangeEvent, useState } from "react";

const skillLevels = ["junior", "medior", "senior", "mentor"] as const;

export type SkillLevel = typeof skillLevels[number];

export type SubmissionState =
  | { tag: "not_submitted_yet" }
  | { tag: "submitting" }
  | { tag: "submitted_successfully" }
  | { tag: "submission_error"; msg: string };

type FormState = {
  name?: string;
  email?: string;
  occupation?: string;
  organizationName?: string;
  profileUrl?: string;
  skills: CompetencyMap;
  legalConsent: boolean;
  submissionState: SubmissionState;
};

export type RegistrationData = {
  name: string;
  email: string;
  skills: CompetencyMap;
  occupation?: string;
  organizationName?: string;
  profileUrl?: string;
};

export type CompetencyList = Record<string, string[]>;

export type PageProps = {
  competencyList: CompetencyList;
  onSubmit?: (data: RegistrationData) => Promise<void>;
};

const OnboardingFormPage: React.FC<PageProps> = ({
  competencyList,
  onSubmit = () => {},
}) => {
  const [state, setState] = useState<FormState>({
    skills: {},
    legalConsent: false,
    submissionState: { tag: "not_submitted_yet" },
  });

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
      <SkillSection
        competencyList={competencyList}
        state={state}
        onChange={setState}
      />
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

function objectByDeleting<K extends string, V>(
  object: Record<K, V>,
  key: K
): Record<K, V> {
  const value = object;
  delete value[key];
  return value;
}

const objectByAdding = <K extends string, V>(
  object: Record<K, V>,
  key: K,
  value: V
) => ({ ...object, [key]: value });

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
      <h1 className="text-[44px] font-bold leading-snug mb-10">
        Staň se členem komunity
      </h1>
      <p>
        Abychom věděli, co by tě z našich aktivit mohlo zajímat a kdo se na tebe
        může z komunity obrátit, řekni nám prosím něco o sobě. Osobní údaje a
        dovednostní preference si pak budeš moci kdykoliv upravit ve svém
        profilu na Portálu dobrovolníka.
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
          autoComplete="name"
          onChange={(name) => onChange({ ...state, name })}
          disabled={disabled}
          required
        />
        <TextInput
          id="email"
          label="Email"
          autoComplete="email"
          onChange={(email) => onChange({ ...state, email })}
          disabled={disabled}
          required
        />
        <OccupationSelect state={state} onChange={onChange} />
        <TextInput
          id="organization"
          label="Název organizace, kde působíš"
          autoComplete="organization"
          disabled={disabled}
          onChange={(organizationName) =>
            onChange({ ...state, organizationName })
          }
        />
        <TextInput
          id="profile"
          label="Odkaz na tvůj web nebo profesní profil"
          type="url"
          disabled={disabled}
          onChange={(profileUrl) => onChange({ ...state, profileUrl })}
        />
      </SectionContent>
    </Section>
  );
};

const OccupationSelect: FormSection = ({ state, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const occupation = value === "nothing" ? undefined : value;
    onChange({ ...state, occupation });
  };
  return (
    <>
      <label htmlFor="occupation">Čemu se aktuálně věnuješ</label>
      <p className="text-base mt-1 text-gray-500">
        Vyber prosím svoji hlavní činnost. U některých možností tě můžeme v
        uvítacím e-mailu kontaktovat s dalšími podrobnostmi ohledně případné
        spolupráce (například u neziskovek či soukromého sektoru).
      </p>
      <select
        id="occupation"
        className="w-full mb-8"
        onChange={handleChange}
        disabled={!isEditable(state)}
      >
        <option value="nothing"></option>
        <option value="private-sector">Pracuji v soukromém sektoru</option>
        <option value="non-profit">Pracuji v neziskové organizaci</option>
        <option value="state">Pracuji ve státním sektoru</option>
        <option value="freelancing">Jsem na volné noze/freelancer</option>
        <option value="studying">Studuji</option>
        <option value="parental-leave">Jsem na rodičovské</option>
        <option value="looking-for-job">Hledám práci</option>
      </select>
    </>
  );
};

//
// Skills section
//

type SkillSectionProps = FormSectionProps & {
  competencyList: CompetencyList;
};

const SkillSection: React.FC<SkillSectionProps> = ({
  state,
  competencyList,
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
        <SkillCategoryPicker
          competencies={competencyList}
          initialSelection={state.skills}
          disabled={!isEditable(state)}
          onChange={(competencies) =>
            onChange({ ...state, skills: competencies })
          }
        />
      </SectionContent>
    </Section>
  );
};

type CompetencyMap = Record<string, SkillLevelMap>;

type SkillCategoryPickerProps = {
  competencies: CompetencyList;
  disabled?: boolean;
  initialSelection?: CompetencyMap;
  onChange?: (competencies: CompetencyMap) => void;
};

const SkillCategoryPicker: React.FC<SkillCategoryPickerProps> = ({
  competencies,
  disabled = false,
  initialSelection = {},
  onChange = (_) => {},
}) => {
  const [selection, setSelection] = useState<CompetencyMap>(initialSelection);
  const updateSelection = (category: string, checked: boolean) => {
    const newState = checked
      ? objectByAdding(selection, category, {})
      : objectByDeleting(selection, category);
    setSelection(newState);
    onChange(newState);
  };
  const updateSkills = (category: string, skills: SkillLevelMap) => {
    const newState = { ...selection, [category]: skills };
    setSelection(newState);
    onChange(newState);
  };

  return (
    <ul className="list-none ml-0 leading-loose">
      {Object.entries(competencies).map(([category, skills]) => (
        <li key={category}>
          <label className="flex items-center">
            <input
              type="checkbox"
              disabled={disabled}
              onChange={(e) => updateSelection(category, e.target.checked)}
              defaultChecked={!!selection[category]}
              className="mr-2"
            ></input>
            {category}
          </label>
          {selection[category] && (
            <SkillPicker
              skills={skills}
              disabled={disabled}
              initialSelection={selection[category]}
              onChange={(skills) => updateSkills(category, skills)}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

type SkillLevelMap = Record<string, SkillLevel | null>;

type SkillPickerProps = {
  skills: string[];
  disabled?: boolean;
  initialSelection?: SkillLevelMap;
  onChange?: (skills: SkillLevelMap) => void;
};

const SkillPicker: React.FC<SkillPickerProps> = ({
  skills,
  disabled = false,
  initialSelection = {},
  onChange = (_) => {},
}) => {
  const [selection, setSelection] = useState<SkillLevelMap>(initialSelection);
  const updateSelection = (skill: string, checked: boolean) => {
    const newState = checked
      ? objectByAdding(selection, skill, null)
      : objectByDeleting(selection, skill);
    setSelection(newState);
    onChange(newState);
  };
  const updateLevel = (skill: string, level: SkillLevel) => {
    const newState = { ...selection, [skill]: level };
    setSelection(newState);
    onChange(newState);
  };

  return (
    <ul className="list-none">
      {skills.map((skill) => (
        <li key={skill}>
          <label className="flex items-center">
            <input
              type="checkbox"
              disabled={disabled}
              defaultChecked={!!selection[skill]}
              onChange={(e) => updateSelection(skill, e.target.checked)}
              className="mr-2"
            ></input>
            {skill}
          </label>
          {selection[skill] !== undefined && (
            <LevelPicker
              namespace={skill}
              disabled={disabled}
              initialValue={selection[skill]}
              onChange={(level) => updateLevel(skill, level)}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

type LevelPickerProps = {
  namespace: string;
  disabled?: boolean;
  initialValue: SkillLevel | null;
  onChange?: (level: SkillLevel) => void;
};

const LevelPicker: React.FC<LevelPickerProps> = ({
  namespace,
  disabled = false,
  initialValue = null,
  onChange = (_) => {},
}) => {
  return (
    <div className="text-base py-2">
      {skillLevels.map((level) => (
        <div key={level} className="inline-block pl-4">
          <label>
            <input
              type="radio"
              value={level}
              disabled={disabled}
              defaultChecked={level === initialValue}
              name={`${namespace}-level`}
              className="mr-2"
              onChange={(_) => onChange(level)}
            />
            {level}
          </label>
        </div>
      ))}
    </div>
  );
};

//
// Legal section
//

const LegalSection: FormSection = ({ state, onChange }) => (
  <Section>
    <SectionContent>
      <h2>
        Abychom s informacemi od tebe mohli dále praccovat, tak tě prosíme o:
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
        <ol className="mb-8 list-decimal space-y-4">
          <li>
            Pro začátek dostaneš všechny potřebné informace v souhrnném uvítacím
            e-mailu.
          </li>
          <li>
            Přesměrujeme tě také rovnou na registrační stránku komunikačního
            nástroje Slack. U nás se bez něho neobejdeš. Veškerá komunikace
            probíhá právě tam. Stačí se zaregistrovat a můžeš začít hledat nové
            příležitosti a kontakty nebo sledovat dění v komunitě.
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
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (newValue: string) => void;
};

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  type = "text",
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
