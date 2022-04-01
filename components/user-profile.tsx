import { UserProfile } from "lib/user-profile";
import { Layout, Section, SectionContent } from "components/layout";
import { Body, Heading1, Heading2 } from "./typography";
import { Button } from "./buttons";
import { Skill } from "lib/skills";
import { unique } from "lib/utils";
import { useState } from "react";

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

// Signed Out / Loading / Error

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

// User Profile

const SignedInPage: React.FC<UserProfilePageProps> = (props) => {
  const profile = props.profile!;
  const { signOut, allSkills, onUserSkillsChange } = props;
  return (
    <MainContainer>
      <Heading>{profile.name}</Heading>
      <SkillBox
        userSkillIds={profile.skills}
        allSkills={allSkills}
        onChange={onUserSkillsChange}
      />
      <Button
        onClick={signOut}
        style={{ marginTop: "40px", marginBottom: "40px" }}
        inverted
      >
        Odhlásit
      </Button>
    </MainContainer>
  );
};

type SkillBoxProps = {
  /** All available skills */
  allSkills: Skill[];
  /** IDs of the skills selected by user */
  userSkillIds: string[];
  /** Called when selected skills change */
  onChange: (skills: Skill[]) => void;
};

const SkillBox: React.FC<SkillBoxProps> = ({
  userSkillIds,
  allSkills,
  onChange,
}) => {
  const userSkills = allSkills.filter((skill) =>
    userSkillIds.includes(skill.id)
  );
  const [selectedSkills, setSelectedSkills] = useState(userSkills);
  const fields = unique(allSkills.map((skill) => skill.field));

  const toggleSkill = (skill: Skill) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((other) => other.id !== skill.id)
      : [skill, ...selectedSkills];
    setSelectedSkills(newSkills);
    onChange(newSkills);
  };

  const skillsForField = (field: string) =>
    allSkills
      .filter((skill) => skill.field === field)
      .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div style={{ marginBottom: "20px" }}>
      <Body style={{ marginBottom: "20px" }}>
        Co byste chtěli v Česko.Digital dělat? Dejte nám to vědět, ať vám můžeme
        různými kanály nabízet relevantnější příležitosti. <i>(Copy TBD)</i>
      </Body>

      {fields.map((field) => (
        <div key={field}>
          <Heading2 style={{ marginBottom: "20px" }}>{field}</Heading2>
          <div style={{ lineHeight: "3ex", marginBottom: "20px" }}>
            {skillsForField(field).map((skill) => (
              <SkillPill
                key={skill.id}
                skill={skill}
                onClick={toggleSkill}
                checked={selectedSkills.some((s) => s.id === skill.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

type SkillPillProps = {
  skill: Skill;
  checked: boolean;
  onClick?: (skill: Skill) => void;
};

const SkillPill: React.FC<SkillPillProps> = ({
  skill,
  checked: checkedInitially,
  onClick = (sender: Skill) => {},
}) => {
  const [checked, setChecked] = useState(checkedInitially);
  const toggle = () => {
    setChecked(!checked);
    onClick(skill);
  };
  return (
    <span
      onClick={toggle}
      style={{
        display: "inline-block",
        background: checked ? "blue" : "#eee",
        color: checked ? "white" : "black",
        padding: "1ex 2ex 1ex 2ex",
        borderRadius: "8px",
        marginRight: "2ex",
        marginBottom: "2ex",
        cursor: "pointer",
      }}
    >
      {skill.name}
    </span>
  );
};

// Shared components

const MainContainer: React.FC = (props) => (
  <div style={{ minHeight: "400px" }}>{props.children}</div>
);

const Heading: React.FC = (props) => (
  <Heading1 style={{ marginBottom: "20px" }}>{props.children}</Heading1>
);
