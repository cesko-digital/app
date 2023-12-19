import { getServerSession } from "next-auth";

import { Breadcrumbs } from "~/components/Breadcrumbs";
import { authOptions } from "~/src/utils";

import { SignedInPage } from "./SignedInPage";
import { SignedOutPage } from "./SignedOutPage";

const Page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs
        path={[{ label: "Homepage", path: "/" }]}
        currentPage="Můj profil"
      />
      {!session?.user && <SignedOutPage />}
      {session?.user && <SignedInPage session={session} />}
    </main>
  );
};

export default Page;
