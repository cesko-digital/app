import { Breadcrumbs } from "~/components/Breadcrumbs";

import { SignInForm } from "./SignInForm";

type Props = {
  searchParams: {
    email?: string;
  };
};

const Page = ({ searchParams }: Props) => {
  const { email } = searchParams;

  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs
        path={[{ label: "Homepage", path: "/" }]}
        currentPage="Registrace"
      />
      <SignInForm defaultEmail={email} />
    </main>
  );
};

export default Page;
