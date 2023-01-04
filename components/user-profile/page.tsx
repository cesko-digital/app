import { UserProfile } from "lib/airtable/user-profile";
import { Layout, Section, SectionContent } from "components/layout";
import { Body } from "components/typography";
import { useState } from "react";
import { NewsletterPrefs, Props as NewsletterProps } from "./newsletter";
import { Button, ButtonSize } from "components/buttons";
import { decodeSkillSelection, SkillMenu, SkillSelection } from "lib/skills";
import { SkillPicker } from "./skill-picker";
import Tabs from "components/tabs";
import { Component } from "lib/utils";

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
    { key: "newsletter", label: "Newsletter" },
  ];

  const [activeSectionKey, setActiveSectionKey] = useState("skills");
  const [skillSelection, setSkillSelection] = useState(
    decodeSkillSelection(profile.skills)
  );

  return (
    <MainContainer>
      <Heading>
        {profile.name}{" "}
        <Button
          size={ButtonSize.Small}
          className="relative ml-5 top-[50%] -translate-y-[30%]"
          onClick={signOut}
          inverted
        >
          Odhlásit
        </Button>
      </Heading>
      <div className="mb-10">
        <Tabs items={sections} onChange={setActiveSectionKey} />
      </div>
      {activeSectionKey === "skills" && (
        <SkillPane
          skillMenu={skillMenu}
          selection={skillSelection}
          onChange={(selection) => {
            setSkillSelection(selection);
            onSkillSelectionChange(selection);
          }}
        />
      )}
      {activeSectionKey === "newsletter" && (
        <NewsletterPrefs {...props.newsletterProps} />
      )}
    </MainContainer>
  );
};

type SkillPaneProps = {
  skillMenu: SkillMenu;
  selection: SkillSelection;
  onChange?: (selection: SkillSelection) => void;
};

const SkillPane: React.FC<SkillPaneProps> = ({
  skillMenu,
  selection,
  onChange = () => {},
}) => {
  return (
    <section className="mb-10 text-lg">
      <p>
        Co chceš v Česko.Digital dělat? Dej nám to vědět, ať ti můžeme různými
        kanály nabízet relevantnější příležitosti.
      </p>
      <SkillPicker
        skillMenu={skillMenu}
        selection={selection}
        onChange={onChange}
      />
    </section>
  );
};

//
// Shared components
//

const MainContainer: Component = ({ children }) => (
  <div className="min-h-[400px]">{children}</div>
);

const Heading: Component = ({ children }) => (
  <h1 className="text-[44px] font-bold leading-snug mb-10">{children}</h1>
);
