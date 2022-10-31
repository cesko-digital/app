import { NextPage, GetStaticProps } from "next";
import { array, dict, string } from "typescript-json-decoder";
import { readFile } from "fs/promises";
import yaml from "js-yaml";
import OnboardingFormPage, {
  CompetencyList,
  RegistrationData,
} from "components/onboarding/form";

type PageProps = {
  defaultCompetencyList: CompetencyList;
};

const Page: NextPage<PageProps> = ({ defaultCompetencyList }) => {
  const handleSubmit = (data: RegistrationData) => {
    console.log(`Submitted data: ${JSON.stringify(data, null, 2)}`);
  };
  return (
    <OnboardingFormPage
      competencyList={defaultCompetencyList}
      onSubmit={handleSubmit}
    />
  );
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

async function getDefaultCompetencyList(): Promise<Record<string, string[]>> {
  const decode = dict(array(string));
  return await readFile("content/competencies.yaml", "utf-8")
    .then((str) => yaml.load(str) as any)
    .then(decode)
    .then((result) => result.entries())
    .then(Object.fromEntries);
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const defaultCompetencyList = await getDefaultCompetencyList();
  return {
    props: { defaultCompetencyList },
  };
};

export default Page;
