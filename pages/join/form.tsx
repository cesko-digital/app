import { NextPage, GetStaticProps } from "next";
import OnboardingPage from "components/onboarding/page";

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  return <OnboardingPage />;
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
