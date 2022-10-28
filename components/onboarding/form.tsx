import { Layout } from "components/layout";
import { ChangeEvent, useState } from "react";

type FormContent = {
  name?: string;
  email?: string;
  occupation?: string;
  organizationName?: string;
  profileUrl?: string;
  skills: string[];
  legalConsent: boolean;
};

export type RegistrationData = {
  name: string;
  email: string;
  skills: string[];
  occupation?: string;
  organizationName?: string;
  profileUrl?: string;
};

export type CompetencyList = Record<string, string[]>;

export type PageProps = {
  defaultCompetencyList: CompetencyList;
  onSubmit?: (data: RegistrationData) => void;
};

const OnboardingFormPage: React.FC<PageProps> = ({
  defaultCompetencyList,
  onSubmit,
}) => {
  const [state, setState] = useState<FormContent>({
    skills: [],
    legalConsent: false,
  });

  const handleSubmit = () => {
    const validationResult = validateForm(state);
    if (validationResult.result === "success") {
      if (onSubmit) {
        onSubmit(validationResult.data);
      } else {
        console.log(
          `Form data: ${JSON.stringify(validationResult.data, null, 2)}`
        );
      }
    } else {
      console.error("Trying to submit form with validation errors.");
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
        competencyList={defaultCompetencyList}
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
  state: FormContent;
  onChange: (state: FormContent) => void;
};

type FormSection = React.FC<FormSectionProps>;

type ValidationResult =
  | { result: "success"; data: RegistrationData }
  | { result: "error"; msg: string };

function validateForm(data: FormContent): ValidationResult {
  const { name, email, skills, legalConsent } = data;
  const error = (msg: string) => ({ result: "error" as const, msg });
  if (!name) {
    return error("Je třeba vyplnit jméno.");
  } else if (!email) {
    return error("Je třeba vyplnit email.");
  } else if (false /* TBD: check skills */) {
    return error("Je třeba vyplnit aspoň jednu dovednost.");
  } else if (!legalConsent) {
    return error("Je třeba odsouhlasit podmínky zpracování osobních údajů.");
  } else {
    const { occupation, organizationName, profileUrl } = data;
    return {
      result: "success",
      data: {
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

const PersonalDetailsSection: FormSection = ({ state, onChange }) => (
  <Section>
    <SectionContent>
      <h2>To nejdůležitější o tobě</h2>
      <TextInput
        id="name"
        label="Jméno a příjmení"
        autoComplete="name"
        onChange={(name) => onChange({ ...state, name })}
        required
      />
      <TextInput
        id="email"
        label="Email"
        autoComplete="email"
        onChange={(email) => onChange({ ...state, email })}
        required
      />
      <OccupationSelect state={state} onChange={onChange} />
      <TextInput
        id="organization"
        label="Název organizace, kde působíš"
        autoComplete="organization"
        onChange={(organizationName) =>
          onChange({ ...state, organizationName })
        }
      />
      <TextInput
        id="profile"
        label="Odkaz na tvůj web nebo profesní profil"
        type="url"
        onChange={(profileUrl) => onChange({ ...state, profileUrl })}
      />
    </SectionContent>
  </Section>
);

const OccupationSelect: FormSection = ({ state, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const occupation = value === "na" ? undefined : value;
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
      <select id="occupation" className="w-full mb-8" onChange={handleChange}>
        <option value="na"></option>
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

const SkillSection: React.FC<SkillSectionProps> = ({ competencyList }) => {
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
        <CompetencyPicker competencies={competencyList} />
      </SectionContent>
    </Section>
  );
};

type CompetencyPickerProps = {
  competencies: CompetencyList;
};

const CompetencyPicker: React.FC<CompetencyPickerProps> = ({
  competencies,
}) => {
  const [selection, setSelection] = useState<Record<string, boolean>>({});
  const updateSelection = (category: string, check: boolean) => {
    setSelection({ ...selection, [category]: check });
  };
  return (
    <ul className="list-none ml-0 leading-loose">
      {Object.entries(competencies).map(([category, skills]) => (
        <li key={category}>
          <label className="flex items-center">
            <input
              type="checkbox"
              onChange={(e) => updateSelection(category, e.target.checked)}
              className="mr-2"
            ></input>
            {category}
          </label>
          {selection[category] && <SkillPicker skills={skills} />}
        </li>
      ))}
    </ul>
  );
};

type SkillPickerProps = {
  skills: string[];
};

const SkillPicker: React.FC<SkillPickerProps> = ({ skills }) => {
  const [selection, setSelection] = useState<string[]>([]);
  const updateSelection = (skill: string, checked: boolean) => {
    if (checked) {
      setSelection([...selection, skill]);
    } else {
      setSelection(selection.filter((s) => s !== skill));
    }
  };
  return (
    <ul className="list-none">
      {skills.map((skill) => (
        <li key={skill}>
          <label className="flex items-center">
            <input
              type="checkbox"
              onChange={(e) => updateSelection(skill, e.target.checked)}
              className="mr-2"
            ></input>
            {skill}
          </label>
          {selection.includes(skill) && <LevelPicker namespace={skill} />}
        </li>
      ))}
    </ul>
  );
};

type LevelPickerProps = {
  namespace: string;
};

const LevelPicker: React.FC<LevelPickerProps> = ({ namespace }) => {
  const levels = ["junior", "medior", "senior", "mentor"];
  return (
    <div className="-mt-1">
      {levels.map((level) => (
        <div key={level} className="inline-block pl-4">
          <label>
            <input
              type="radio"
              value={level}
              name={`${namespace}-level`}
              className="mr-2"
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
      <input
        type="checkbox"
        id="privacy"
        defaultChecked={state.legalConsent}
        onChange={(e) => onChange({ ...state, legalConsent: e.target.checked })}
      ></input>
      <label htmlFor="privacy" className="ml-2">
        Souhlas se{" "}
        <a href="https://cesko.digital/go/privacy">
          zpracováním osobních údajů
        </a>
        <RequiredFieldMarker />
      </label>
    </SectionContent>
  </Section>
);

//
// Submit section
//

type SubmitSectionProps = FormSectionProps & {
  onSubmit?: () => void;
};

const SubmitSection: React.FC<SubmitSectionProps> = ({
  state,
  onSubmit = () => {},
}) => {
  const validationResult = validateForm(state);
  const canSubmit = validationResult.result === "success";
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
        <button
          onClick={onSubmit}
          disabled={!canSubmit}
          className={
            canSubmit ? "btn-primary" : "btn-disabled cursor-not-allowed"
          }
        >
          Odeslat a přejít na Slack
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
  onChange?: (newValue: string) => void;
};

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  type = "text",
  required = false,
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
        autoComplete={autoComplete}
        type={type}
        className="rounded-md border-2 border-gray p-2 w-full"
        onChange={(e) => onChange(e.target.value)}
      ></input>
    </div>
  );
};

export default OnboardingFormPage;
