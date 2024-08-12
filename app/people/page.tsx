import { type Metadata } from "next";

import { Breadcrumbs } from "~/components/Breadcrumbs";
import {
  UserProfileCard,
  UserProfileContainer,
} from "~/components/UserProfileCard";
import { compareByName, getAllUserProfiles } from "~/src/data/user-profile";
import { skillsToHashtags } from "~/src/skills/skills";
import { strip } from "~/src/utils";

/** Refresh data every 5 minutes */
export const revalidate = 300;

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
  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs currentPage="Lidé" />
      <h1 className="typo-title mb-10 mt-7">Lidé</h1>
      <p className="mb-10 max-w-prose">{metadata.description}</p>
      <UserProfileContainer>
        {profiles.sort(compareByName).map((profile) => (
          <UserProfileCard
            key={profile.id}
            profile={profile}
            label={skillsToHashtags(profile.skills)}
          />
        ))}
      </UserProfileContainer>
    </main>
  );
}

export default Page;
