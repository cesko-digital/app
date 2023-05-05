import { getAllUserProfiles } from "lib/airtable/user-profile";
import { notEmpty } from "lib/utils";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { MapModel } from "../model";

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token || !token.sub) {
    return new Response("Authentication required", { status: 401 });
  }

  const profiles = await getAllUserProfiles("Profiles with Districts");
  const response: MapModel = {};
  for (const profile of profiles) {
    const districts =
      profile.availableInDistricts
        ?.split(/,\s*/)
        .filter(notEmpty)
        .map(normalize) || [];
    districts.forEach((d) => {
      response[d] = response[d] || [];
      response[d].push({
        name: profile.name,
        slackId: profile.slackId,
        slackAvatarUrl: profile.slackAvatarUrl,
        slackProfileUrl: profile.slackProfileUrl,
      });
    });
  }

  return new Response(JSON.stringify(response, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

const normalize = (s: string) =>
  s
    // Remove leading whitespace
    .replaceAll(/^\s*/g, "")
    // Remove trailing whitespace
    .replaceAll(/\s*$/g, "");
