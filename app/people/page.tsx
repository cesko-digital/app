import { Breadcrumbs } from "~/components/Breadcrumbs";
import {
  UserProfileCard,
  UserProfileContainer,
} from "~/components/UserProfileCard";
import { getAllUserProfiles, getUserHashtags } from "~/src/data/user-profile";

async function Page() {
  const profiles = await getAllUserProfiles("Public Profiles");
  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs currentPage="Lidé" />

      <h1 className="typo-title mb-10 mt-7">Lidé</h1>
      <p className="mb-10 max-w-prose">
        Důležitou součástí naší práce je propojovat lidi, tenhle adresář s tím
        pomáhá. Zatím ho teprve testujeme, takže tu není mnoho lidí ani funkcí,
        ale to se brzy změní.
      </p>
      <UserProfileContainer>
        {profiles.map((profile) => (
          <UserProfileCard
            key={profile.id}
            profile={profile}
            label={getUserHashtags(profile).join(" ")}
          />
        ))}
      </UserProfileContainer>
    </main>
  );
}

export default Page;
