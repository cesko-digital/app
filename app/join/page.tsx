import { Breadcrumbs } from "~/components/Breadcrumbs";

import { SignUpForm } from "./SignUpForm";

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
      <SignUpForm defaultEmail={email} />
    </main>
  );
};

export default Page;
