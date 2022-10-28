import { NextPage, GetStaticProps } from "next";
import OnboardingFormPage, {
  RegistrationData,
} from "components/onboarding/form";

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const handleSubmit = (data: RegistrationData) => {
    console.log(`Submitted data: ${JSON.stringify(data, null, 2)}`);
  };
  return <OnboardingFormPage onSubmit={handleSubmit} />;
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

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  return {
    props: {},
  };
};

export default Page;
