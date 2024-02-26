import { getServerSession } from "next-auth";

import { SignedInPage } from "~/app/profile/SignedInPage";
import { SignedOutPage } from "~/app/profile/SignedOutPage";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { authOptions } from "~/src/auth";

type Props = {
  children: React.ReactNode;
  params: { tab: string };
};

const Layout = async ({ children, params }: Props) => {
  const session = await getServerSession(authOptions);

  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs
        path={[{ label: "Homepage", path: "/" }]}
        currentPage="Můj profil"
      />

      {!session?.user && <SignedOutPage />}
      {session?.user && (
        <>
          <SignedInPage session={session} activeTab={params.tab} />
          <div className="mt-7">{children}</div>
        </>
      )}
    </main>
  );
};

export default Layout;
