import { type Metadata } from "next";

import { Breadcrumbs } from "~/components/Breadcrumbs";
import {
  UserProfileCard,
  UserProfileContainer,
} from "~/components/UserProfileCard";
import {
  compareByName,
  getAllUserProfiles,
  type UserProfile,
} from "~/src/data/user-profile";
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
            label={<Skills profile={profile} />}
          />
        ))}
      </UserProfileContainer>
    </main>
  );
}

const Skills = ({ profile }: { profile: UserProfile }) => (
  <ul className="line-clamp-6 text-balance">
    {profile.tags.split(/;\s*/).map((tag) => (
      <li key={tag} className="inline">
        {tag}
        <span
          className="bg-center bg-no-repeat tracking-[0.8em]"
          style={{ backgroundImage: `url(${bulletImage})` }}
        >
          {" "}
        </span>
      </li>
    ))}
  </ul>
);

const bulletImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwAAADsABataJCQAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xMkMEa+wAAAAnSURBVBhXY/Dz89MA4sNA/B9Ka4AEYQIwfBgkiCwAxjhVopnppwEApxQqhnyQ+VkAAAAASUVORK5CYII=";

export default Page;
