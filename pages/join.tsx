import type { NextPage, GetStaticProps } from "next";
import { RegistrationData } from "components/onboarding/form";
import { loadAllSkills } from "lib/skills";
import { OnboardingPage, PageProps } from "components/onboarding/page";

type StaticPageProps = Omit<PageProps, "onSubmit">;

const Page: NextPage<StaticPageProps> = ({ skills }) => {
  return <OnboardingPage skills={skills} onSubmit={submitRegistrationData} />;
};

async function submitRegistrationData(
  data: RegistrationData
): Promise<boolean> {
  try {
    const response = await fetch("/api/registrations", {
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

export const getStaticProps: GetStaticProps<StaticPageProps> = async () => {
  const skills = await loadAllSkills();
  return {
    props: { skills },
  };
};

export default Page;
