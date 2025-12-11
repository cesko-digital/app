import { Suspense } from "react";
import { type Metadata } from "next";

import { stripNonPublicFields } from "~/app/(app)/people/matching";
import { ProfileVisibilityPrefs } from "~/app/(app)/people/ProfileVisibilityPrefs";
import { SearchablePeopleBox } from "~/app/(app)/people/SearchablePeopleBox";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { getAllUserProfiles } from "~/src/data/user-profile";
import { strip } from "~/src/utils";

export const metadata: Metadata = {
  title: "Lidé | Česko.Digital",
  description: strip`Důležitou součástí naší práce je propojovat lidi, tenhle adresář
    s tím pomáhá. Zatím ho teprve testujeme, takže tu není mnoho lidí ani funkcí,
    ale to se brzy změní.`,
  openGraph: {
    images: "https://assets.cesko.digital/df17b194.jpeg",
  },
};

/** People address book */
async function Page() {
  const profiles = await getAllUserProfiles("Public Profiles");
  const strippedProfiles = profiles.map(stripNonPublicFields);

  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs currentPage="Lidé" />
      <h1 className="typo-title mb-10 mt-7">Lidé</h1>
      <p className="mb-5 max-w-prose">{metadata.description}</p>
      <ProfileVisibilityPrefs />
      <Suspense fallback="Načítám data…">
        <SearchablePeopleBox allUserProfiles={strippedProfiles} />
      </Suspense>
    </main>
  );
}

export default Page;
