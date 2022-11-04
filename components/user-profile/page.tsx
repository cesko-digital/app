import { UserProfile } from "lib/airtable/user-profile";
import { Layout, Section, SectionContent } from "components/layout";
import { Body, BodySmall, Heading1 } from "components/typography";
import { useState } from "react";
import { NewsletterPrefs, Props as NewsletterProps } from "./newsletter";
import { Button, ButtonSize } from "components/buttons";
import { SkillMenu, SkillPicker, SkillSelection } from "./skill-picker";
import Tabs from "components/tabs";

export type UserProfilePageState =
  | "loading"
  | "signed_out"
  | "loading_error"
  | "signed_in";

export type PageProps = {
  /** Page state (loading, signed out, …) */
  state: UserProfilePageState;
  /** Skill menu user can select from */
  skillMenu: SkillMenu;
  /** User profile for the signed-in user */
  profile?: UserProfile;
  /** What should be done when user clicks “Sign In” */
  signIn: () => void;
  /** What should be done when user clicks “Sign Out” */
  signOut: () => void;
  /** Called when selected skills change */
  onSkillSelectionChange: (selection: SkillSelection) => void;
  /** Newsletter management props */
  newsletterProps: NewsletterProps;
};

export const UserProfilePage: React.FC<PageProps> = (props) => {
  return (
    <Layout crumbs={[{ label: "Profil uživatele" }]}>
      <Section>
        <SectionContent>
          <PageContent {...props} />
        </SectionContent>
      </Section>
    </Layout>
  );
};

const PageContent: React.FC<PageProps> = (props) => {
  const { state, signIn } = props;
  switch (state) {
    case "signed_out":
      return <SignedOutPage signIn={signIn} />;
    case "loading":
      return <LoadingPage />;
    case "loading_error":
      return <ErrorPage />;
    case "signed_in":
      return <SignedInPage {...props} />;
  }
};

//
// Signed Out / Loading / Error
//

const SignedOutPage: React.FC<{ signIn: () => void }> = ({ signIn }) => (
  <MainContainer>
    <Heading>Profil uživatele</Heading>
    <Body>
      Pro zobrazení této stránky se musíte{" "}
      <a href="" onClick={signIn}>
        přihlásit
      </a>
      .
    </Body>
  </MainContainer>
);

const LoadingPage = () => (
  <MainContainer>
    <Heading>Profil uživatele</Heading>
    <Body>Načítám…</Body>
  </MainContainer>
);

const ErrorPage = () => (
  <MainContainer>
    <Heading>Profil uživatele</Heading>
    <Body>Při načítání profilu došlo k chybě. Zkuste obnovit stránku?</Body>
  </MainContainer>
);

//
// User Profile
//

const SignedInPage: React.FC<PageProps> = (props) => {
  const profile = props.profile!;
  const { signOut, skillMenu, onSkillSelectionChange } = props;

  const sections = [
    { key: "skills", label: "Dovednosti" },
    { key: "settings", label: "Nastavení" },
  ];

  const [activeSectionKey, setActiveSectionKey] = useState("skills");

  return (
    <MainContainer>
      <Heading>
        {profile.name}{" "}
        <Button
          size={ButtonSize.Small}
          onClick={signOut}
          inverted
          style={{
            marginLeft: "20px",
            position: "relative",
            top: "50%",
            transform: "translateY(-30%)",
          }}
        >
          Odhlásit
        </Button>
      </Heading>
      <BodySmall>
        Možnost přihlášení a správy uživatelského profilu je čerstvá novinka,
        kterou vám chceme zjednodušit zapojování do různých aktivit
        Česko.Digital. A jako každá novinka to{" "}
        <span style={{ textDecoration: "line-through" }}>může mít</span> určitě
        má mouchy. Pokud narazíte na chyby nebo věci, které by mohly fungovat
        lépe,{" "}
        <a href="https://github.com/cesko-digital/web/issues">
          otevřte nový ticket
        </a>
        , dejte nám vědět v kanálu{" "}
        <a href="https://cesko-digital.slack.com/archives/CHG9NA23D">
          #run-ceskodigital_web
        </a>{" "}
        nebo prostě <a href="mailto:zoul@cesko.digital">napište mail</a>. Díky!
      </BodySmall>
      <div style={{ paddingTop: "30px", marginBottom: "40px" }}>
        <Tabs items={sections} onChange={setActiveSectionKey} />
      </div>
      {activeSectionKey === "skills" && (
        <SkillPane
          skillMenu={skillMenu}
          onSkillSelectionChange={onSkillSelectionChange}
        />
      )}
      {activeSectionKey === "settings" && (
        <NewsletterPrefs {...props.newsletterProps} />
      )}
    </MainContainer>
  );
};

type SkillPaneProps = Pick<PageProps, "skillMenu" | "onSkillSelectionChange">;

const SkillPane: React.FC<SkillPaneProps> = ({
  skillMenu,
  onSkillSelectionChange,
}) => (
  <section className="mb-10">
    <p className="text-lg">
      Co chceš v Česko.Digital dělat? Dej nám to vědět, ať ti můžeme různými
      kanály nabízet relevantnější příležitosti.
    </p>
    <SkillPicker skillMenu={skillMenu} onChange={onSkillSelectionChange} />
  </section>
);

//
// Shared components
//

const MainContainer: React.FC = (props) => (
  <div style={{ minHeight: "400px" }}>{props.children}</div>
);

const Heading: React.FC = (props) => (
  <Heading1 style={{ marginBottom: "20px" }}>{props.children}</Heading1>
);
