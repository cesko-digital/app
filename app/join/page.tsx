import { Breadcrumbs } from "~/components/Breadcrumbs";

import { SignUpForm } from "./SignUpForm";

type Props = {
  searchParams: {
    email?: string;
    callbackUrl?: string;
  };
};

const Page = ({ searchParams }: Props) => {
  const { email, callbackUrl = "/" } = searchParams;

  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs currentPage="Registrace" />
      <SignUpForm defaultEmail={email} callbackUrl={callbackUrl} />
    </main>
  );
};

export default Page;
