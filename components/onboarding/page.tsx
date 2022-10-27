import { Layout } from "components/layout";

type PageProps = {};

const OnboardingPage: React.FC<PageProps> = ({}) => {
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
      <PersonalDetailsSection />
      <SkillSection />
      <LegalSection />
      <SubmitSection />
    </Layout>
  );
};

/** Intro section */
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

/** Personal details section */
const PersonalDetailsSection = () => (
  <Section>
    <SectionContent>
      <h2>To nejdůležitější o tobě</h2>
      <TextInput id="name" label="Jméno a příjmení" required />
      <TextInput id="email" label="Email" required />
      <label htmlFor="occupation">Čemu se aktuálně věnuješ</label>
      <p className="text-base mt-1 text-gray-500">
        Vyber prosím svoji hlavní činnost. U některých možností tě můžeme v
        uvítacím e-mailu kontaktovat s dalšími podrobnostmi ohledně případné
        spolupráce (například u neziskovek či soukromého sektoru).
      </p>
      <select id="occupation" className="w-full mb-8">
        <option></option>
        <option>Pracuji v soukromém sektoru</option>
        <option>Pracuji v neziskové organizaci</option>
        <option>Pracuji ve státním sektoru</option>
        <option>Jsem na volné noze/freelancer</option>
        <option>Studuji</option>
        <option>Jsem na rodičovské</option>
        <option>Hledám práci</option>
      </select>
      <TextInput id="organization" label="Název organizace, kde působíš" />
      <TextInput
        id="profile"
        label="Odkaz na tvůj web nebo profesní profil"
        type="url"
      />
    </SectionContent>
  </Section>
);

/** Skills section */
const SkillSection = () => (
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
      <p className="bg-yellow-200">Here be dragons.</p>
    </SectionContent>
  </Section>
);

const LegalSection = () => (
  <Section>
    <SectionContent>
      <h2>
        Abychom s informacemi od tebe mohli dále praccovat, tak tě prosíme o:
      </h2>
      <input type="checkbox" id="privacy"></input>
      <label htmlFor="privacy" className="ml-2">
        Souhlas se{" "}
        <a href="https://docs.google.com/document/d/e/2PACX-1vQ3cVnhGyzIsyDx0gyx3uPJharkhhfQOXHcgCI3swVZaDd0sXhmX74E1IVEtItWvA2H_dQqGTkxeR2q/pub">
          zpracováním osobních údajů
        </a>
      </label>
    </SectionContent>
  </Section>
);

const SubmitSection = () => (
  <Section>
    <SectionContent>
      <h2>Co tě čeká po odeslání formuláře</h2>
      <ol>
        <li>
          Pro začátek dostaneš všechny potřebné informace v souhrnném uvítacím
          e-mailu.
        </li>
        <li>
          Přesměrujeme tě také rovnou na registrační stránku komunikačního
          nástroje Slack. U nás se bez něho neobejdeš. Veškerá komunikace
          probíhá právě tam. Stačí se zaregistrovat a můžeš začít hledat nové
          příležitosti a kontakty nebo sledovat dění v komunitě.
        </li>
      </ol>
      <button className="btn-primary mt-8">Odeslat a přejít na Slack</button>
    </SectionContent>
  </Section>
);

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
  required?: boolean;
};

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  type = "text",
  required = false,
}) => {
  return (
    <div className="mb-6">
      <label htmlFor={id}>
        {label}
        {required && <RequiredFieldMarker />}
      </label>
      <input
        id={id}
        type={type}
        className="rounded-md border-2 border-gray p-2 w-full"
      ></input>
    </div>
  );
};

export default OnboardingPage;
