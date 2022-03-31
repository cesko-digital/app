import { UserProfile } from "lib/user-profile";
import { Layout, Section, SectionContent } from "components/layout";

export type UserProfilePageState =
  | "loading"
  | "signed_out"
  | "loading_error"
  | "signed_in";

export type UserProfilePageProps = {
  state: UserProfilePageState;
  profile?: UserProfile;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
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
  const { state, profile, signIn, signOut } = props;
  switch (state) {
    case "signed_out":
      return <button onClick={signIn}>Sign In</button>;
    case "loading":
      return <p>Loading…</p>;
    case "loading_error":
      return <p>Error loading user profile. Refresh page to try again.</p>;
    case "signed_in":
      return (
        <p>
          Hello, {profile!.name}! <button onClick={signOut}>Sign out</button>
        </p>
      );
  }
};
