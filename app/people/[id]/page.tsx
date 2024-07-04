import { notFound } from "next/navigation";

import { Breadcrumbs } from "~/components/Breadcrumbs";
import { getUserProfile } from "~/src/data/user-profile";
import { Route } from "~/src/routing";

type Params = {
  id: string;
};

export type Props = {
  params: Params;
};

async function Page({ params }: Props) {
  const profile = await getUserProfile(params.id);
  if (!profile) {
    // TBD: Maybe the profile is private?
    notFound();
  }
  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs
        path={[{ label: "Lidé", path: Route.people }]}
        currentPage={profile.name}
      />
      <h1 className="typo-title mb-10 mt-7">{profile.name}</h1>
    </main>
  );
}

export default Page;
