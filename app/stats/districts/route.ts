import { getAllUserProfiles } from "src/data/user-profile";
import { notEmpty, unique } from "src/utils";

export const dynamic = "force-dynamic";

const normalize = (s: string) =>
  s
    // Remove leading whitespace
    .replaceAll(/^\s*/g, "")
    // Remove trailing whitespace
    .replaceAll(/\s*$/g, "");

export async function GET() {
  const profiles = await getAllUserProfiles("Profiles with Districts");
  const districtNames = profiles
    .map((profile) => profile.availableInDistricts)
    .flatMap((str) => str?.split(/,\s*/))
    .filter(notEmpty)
    .map(normalize);
  const count = (district: string) =>
    districtNames.filter((d) => d === district).length;
  const stats = Object.fromEntries(
    unique(districtNames).map(
      (district) => [district, count(district)] as const
    )
  );

  let response = "Okres,Počet lidí\n";
  response += Object.entries(stats)
    .map(([district, count]) => [district, count].join(","))
    .join("\n");
  return new Response(response, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Cache-Control": "s-maxage=300, stale-while-revalidate",
    },
  });
}
