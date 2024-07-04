import { Breadcrumbs } from "~/components/Breadcrumbs";
import { UserProfileCard } from "~/components/MemberCard";
import { getAllUserProfiles } from "~/src/data/user-profile";
import { skillsToHashtags } from "~/src/skills/skills";

async function Page() {
  const profiles = await getAllUserProfiles("Public Profiles");
  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs currentPage="Lidé" />

      <h1 className="typo-title mb-10 mt-7">Lidé</h1>
      <p className="mb-10 max-w-prose">
        TBD: Semka přijde popisek o tom, jak tahle sekce funguje. TBD: Dodělat
        analogický popisek k hledaným rolím?
      </p>
      <div className="grid gap-7 md:grid-cols-3 xl:grid-cols-4">
        {profiles.map((profile) => (
          <UserProfileCard
            key={profile.id}
            profile={profile}
            label={skillsToHashtags(profile.skills)}
          />
        ))}
      </div>
    </main>
  );
}

export default Page;
