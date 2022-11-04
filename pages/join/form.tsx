import { NextPage, GetStaticProps } from "next";
import { array, dict, string } from "typescript-json-decoder";
import { readFile } from "fs/promises";
import { SkillMenu } from "components/user-profile/skill-picker";
import yaml from "js-yaml";
import OnboardingFormPage, {
  RegistrationData,
} from "components/onboarding/form";

type PageProps = {
  skillMenu: SkillMenu;
};

const Page: NextPage<PageProps> = ({ skillMenu }) => {
  const handleSubmit = async (data: RegistrationData) => {
    console.log(`Submitted data: ${JSON.stringify(data, null, 2)}`);
    await new Promise((r) => setTimeout(r, 4000));
  };
  return <OnboardingFormPage skillMenu={skillMenu} onSubmit={handleSubmit} />;
};

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

async function getDefaultSkillMenu(): Promise<SkillMenu> {
  const decode = dict(array(string));
  return await readFile("content/competencies.yaml", "utf-8")
    .then((str) => yaml.load(str) as any)
    .then(decode)
    .then((result) => result.entries())
    .then(Object.fromEntries);
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const skillMenu = await getDefaultSkillMenu();
  return {
    props: { skillMenu },
  };
};

export default Page;
