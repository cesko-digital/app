import { getServerSession } from "next-auth";

import { Breadcrumbs } from "~/components/Breadcrumbs";
import { authOptions } from "~/src/auth";

import { SignedInPage } from "./SignedInPage";
import { SignedOutPage } from "./SignedOutPage";

const Page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs currentPage="Můj účet" />
      {!session?.user && <SignedOutPage />}
      {session?.user && <SignedInPage session={session} />}
    </main>
  );
};

export default Page;
