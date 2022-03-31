import { UserProfile } from "lib/user-profile";
import { Layout, Section, SectionContent } from "components/layout";
import { Body, Heading1 } from "./typography";
import { Button } from "./buttons";
import { Skill } from "lib/skills";

export type UserProfilePageState =
  | "loading"
  | "signed_out"
  | "loading_error"
  | "signed_in";

export type UserProfilePageProps = {
  userSkills: Skill[];
  state: UserProfilePageState;
  profile?: UserProfile;
  signIn: () => void;
  signOut: () => void;
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
  const { signOut, userSkills } = props;
  return (
    <MainContainer>
      <Heading>{profile.name}</Heading>
      <SkillBox skills={userSkills} />
      <Button onClick={signOut} style={{ marginTop: "40px" }} inverted>
        Odhlásit
      </Button>
    </MainContainer>
  );
};

const SkillBox: React.FC<{ skills: Skill[] }> = ({ skills }) => {
  const haveSkills = skills.length > 0;
  return (
    <div style={{ marginBottom: "20px" }}>
      {haveSkills &&
        skills.map((skill, index) => <SkillPill key={index} {...skill} />)}
      {!haveSkills && (
        <Body>V uživatelském profilu nemáte vyplněné žádné dovednosti.</Body>
      )}
    </div>
  );
};

const SkillPill = (skill: Skill) => (
  <span
    style={{
      background: "#eee",
      padding: "1ex 2ex 1ex 2ex",
      borderRadius: "8px",
      marginRight: "2ex",
    }}
  >
    {skill.field.toLocaleLowerCase()} / {skill.name.toLocaleLowerCase()}
  </span>
);

// Shared components

const MainContainer: React.FC = (props) => (
  <div style={{ minHeight: "400px" }}>{props.children}</div>
);

const Heading: React.FC = (props) => (
  <Heading1 style={{ marginBottom: "20px" }}>{props.children}</Heading1>
);
