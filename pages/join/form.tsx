import { NextPage, GetStaticProps } from "next";
import { SkillMenu } from "components/user-profile/skill-picker";
import { getDefaultSkillMenu } from "lib/skills";
import Plausible from "plausible-tracker";
import { Route } from "lib/utils";
import OnboardingFormPage, {
  RegistrationData,
} from "components/onboarding/form";

type PageProps = {
  skillMenu: SkillMenu;
};

const Page: NextPage<PageProps> = ({ skillMenu }) => {
  const handleSubmit = async (data: RegistrationData) => {
    console.log(`Submitted data: ${JSON.stringify(data, null, 2)}`);
    const { trackEvent } = Plausible({ domain: "cesko.digital" });
    trackEvent("SignUp");
    setTimeout(() => {
      document.location.href = Route.slackOnboarding;
    }, 1000);
  };
  return <OnboardingFormPage skillMenu={skillMenu} onSubmit={handleSubmit} />;
};

// TBD: Update for new DB schema
async function createUserProfile(data: any): Promise<boolean> {
  try {
    const response = await fetch("/api/user_profiles", {
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    return response.ok;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const skillMenu = await getDefaultSkillMenu();
  return {
    props: { skillMenu },
  };
};

export default Page;
