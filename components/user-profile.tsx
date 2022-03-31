import { UserProfile } from "lib/user-profile";
import { Layout, Section, SectionContent } from "components/layout";
import { Body, Heading1 } from "./typography";
import { Button } from "./buttons";

export type UserProfilePageState =
  | "loading"
  | "signed_out"
  | "loading_error"
  | "signed_in";

export type UserProfilePageProps = {
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
      return <p>Error loading user profile. Refresh page to try again.</p>;
    case "signed_in":
      return <SignedInPage {...props} />;
  }
};

const SignedInPage: React.FC<UserProfilePageProps> = (props) => {
  const profile = props.profile!;
  const { signOut } = props;
  return (
    <MainContainer>
      <Heading>{profile.name}</Heading>
      <Button onClick={signOut} inverted>
        Odhlásit
      </Button>
    </MainContainer>
  );
};

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

const MainContainer: React.FC = (props) => (
  <div style={{ minHeight: "400px" }}>{props.children}</div>
);

const Heading: React.FC = (props) => (
  <Heading1 style={{ marginBottom: "20px" }}>{props.children}</Heading1>
);
