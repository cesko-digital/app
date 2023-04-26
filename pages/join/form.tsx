import Plausible from "plausible-tracker";
import { Route } from "lib/routing";
import skillMenu from "content/skills.json";
import { encodeSkillSelection } from "lib/skills";
import OnboardingFormPage from "app/join/form";
import { RegistrationData } from "app/join/form-state";

const { trackEvent } = Plausible({ domain: "cesko.digital" });

/** Onboarding form page */
const Page = () => {
  // When submitted, create new user account, log page conversion and redirect to Slack onboarding
  const handleSubmit = async (data: RegistrationData) => {
    await createUserProfile(data);
    trackEvent("SignUp");
    setTimeout(() => {
      document.location.href = Route.slackOnboarding;
    }, 1000);
  };
  // Most of the work is done by the following component
  return <OnboardingFormPage skillMenu={skillMenu} onSubmit={handleSubmit} />;
};

async function createUserProfile(data: RegistrationData): Promise<boolean> {
  const payload = { ...data, skills: encodeSkillSelection(data.skills) };
  try {
    const response = await fetch("/api/user_profiles", {
      method: "post",
      body: JSON.stringify(payload, null, 2),
      headers: { "Content-Type": "application/json" },
    });
    return response.ok;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export default Page;
