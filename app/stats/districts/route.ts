import { getAllUserProfiles } from "lib/airtable/user-profile";
import { notEmpty, unique } from "lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const profiles = await getAllUserProfiles("Profiles with Districts");
  const districtNames = profiles
    .map((profile) => profile.availableInDistricts)
    .flatMap((str) => str?.split(/,\s*/))
    .filter(notEmpty);
  const count = (district: string) =>
    districtNames.filter((d) => d === district).length;
  const stats = Object.fromEntries(
    unique(districtNames).map(
      (district) => [district, count(district)] as const
    )
  );

  const format = new URL(request.url).searchParams.get("format");

  if (format === "json") {
    return NextResponse.json(stats);
  } else {
    let response = "Okres,Počet lidí\n";
    response += Object.entries(stats)
      .map(([district, count]) => [district, count].join(","))
      .join("\n");
    return new Response(response, {
      status: 200,
      headers: { "Content-Type": "text/csv; charset=utf-8" },
    });
  }
}
