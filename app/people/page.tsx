import { Breadcrumbs } from "~/components/Breadcrumbs";
import { UserProfileCard } from "~/components/MemberCard";
import { getAllUserProfiles } from "~/src/data/user-profile";
import { unique } from "~/src/utils";

async function Page() {
  const profiles = await getAllUserProfiles("Public Profiles");
  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs
        path={[{ label: "Homepage", path: "/" }]}
        currentPage="Lidé"
      />

      <h1 className="typo-title mb-10 mt-7">Lidé</h1>
      <div className="grid gap-7 md:grid-cols-3 xl:grid-cols-4">
        {profiles.map((profile) => (
          <UserProfileCard
            key={profile.id}
            profile={profile}
            label={dressSkills(profile.skills)}
          />
        ))}
      </div>
    </main>
  );
}

const dressSkills = (skills: string) => {
  const uppercaseFirst = (s: string) =>
    s.charAt(0).toLocaleUpperCase() + s.slice(1);
  const categories = skills
    .split(/;\s*/)
    .map((s) => s.split(/\s*\/\s*/).shift())
    .map((c) => c?.split(" ").map(uppercaseFirst).join(""));
  return unique(categories)
    .sort()
    .map((c) => "#" + c)
    .join(" ");
};

export default Page;
