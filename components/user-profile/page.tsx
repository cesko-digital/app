import { UserProfile } from "lib/airtable/user-profile";
import { Layout, Section, SectionContent } from "components/layout";
import { Body, Heading1 } from "components/typography";
import { Button } from "components/buttons";
import { Skill } from "lib/airtable/skills";
import { SkillBox } from "./user-skills";
import Tabs from "components/tabs";
import { useState } from "react";
import { NewsletterPrefs } from "./newsletter";

export type UserProfilePageState =
  | "loading"
  | "signed_out"
  | "loading_error"
  | "signed_in";

export type UserProfilePageProps = {
  /** Page state (loading, signed out, …) */
  state: UserProfilePageState;
  /** All available skills */
  allSkills: Skill[];
  /** User profile for the signed-in user */
  profile?: UserProfile;
  /** What should be done when user clicks “Sign In” */
  signIn: () => void;
  /** What should be done when user clicks “Sign Out” */
  signOut: () => void;
  /** Called when selected skills change */
  onUserSkillsChange: (skills: Skill[]) => void;
};

export const UserProfilePage: React.FC<UserProfilePageProps> = (props) => {
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

const PageContent: React.FC<UserProfilePageProps> = (props) => {
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

const SignedInPage: React.FC<UserProfilePageProps> = (props) => {
  const profile = props.profile!;
  const { signOut, allSkills, onUserSkillsChange } = props;

  const sections = [
    { key: "skills", label: "Dovednosti" },
    { key: "settings", label: "Nastavení" },
  ];

  const [activeSectionKey, setActiveSectionKey] = useState("skills");

  return (
    <MainContainer>
      <Heading>{profile.name}</Heading>
      <div style={{ paddingTop: "20px", marginBottom: "40px" }}>
        <Tabs items={sections} onChange={setActiveSectionKey} />
      </div>
      {activeSectionKey === "skills" && (
        <SkillBox
          userSkillIds={profile.skills}
          allSkills={allSkills}
          onChange={onUserSkillsChange}
        />
      )}
      {activeSectionKey === "settings" && (
        <>
          <NewsletterPrefs />
        </>
      )}
    </MainContainer>
  );
};

//
// Shared components
//

const MainContainer: React.FC = (props) => (
  <div style={{ minHeight: "400px" }}>{props.children}</div>
);

const Heading: React.FC = (props) => (
  <Heading1 style={{ marginBottom: "20px" }}>{props.children}</Heading1>
);
