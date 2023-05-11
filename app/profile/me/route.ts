import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getSlackUserBySlackId } from "lib/airtable/slack-user";
import {
  createUserProfile,
  getUserProfile,
  getUserProfileByMail,
  updateUserProfile,
} from "lib/airtable/user-profile";
import { optional, record, string } from "typescript-json-decoder";
import { normalizeEmailAddress } from "lib/utils";

/** Create new user profile (called by the onboarding form) */
export async function POST(request: NextRequest): Promise<Response> {
  const decodeRequest = record({
    name: string,
    email: string,
    skills: string,
    gdprPolicyAcceptedAt: string,
    occupation: optional(string),
    organizationName: optional(string),
    profileUrl: optional(string),
  });
  try {
    const payload = decodeRequest(await request.json());
    const email = normalizeEmailAddress(payload.email);
    const previousProfile = await getUserProfileByMail(email).catch(() => null);
    if (previousProfile) {
      const msg = "Email already exists";
      console.error(msg);
      return new Response(msg, { status: 401 });
    } else {
      await createUserProfile({
        ...payload,
        email,
        state: "unconfirmed",
        slackUserRelationId: undefined,
        createdAt: new Date().toISOString(),
      });
      return new Response("User profile created.", { status: 201 });
    }
  } catch (e) {
    console.error(e);
    return new Response("Sorry :(", { status: 500 });
  }
}

/** Get user profile, used for stuff like displaying user preferences */
export async function GET(request: NextRequest) {
  return withAuthenticatedUser(request, async (slackId) => {
    let profile = await getUserProfile(slackId).catch(() => null);
    if (!profile) {
      // The profile doesn’t exist yet, let’s create it now
      const slackUser = await getSlackUserBySlackId(slackId);
      profile = await createUserProfile({
        name: slackUser.name,
        email: slackUser.email!,
        skills: "",
        occupation: undefined,
        organizationName: undefined,
        profileUrl: undefined,
        state: "confirmed",
        slackUserRelationId: slackUser.id,
        createdAt: new Date().toISOString(),
        gdprPolicyAcceptedAt: undefined,
      });
    }
    return NextResponse.json(profile);
  });
}

/** Change user profile, used for stuff like updating user preferences */
export async function PATCH(request: NextRequest) {
  return withAuthenticatedUser(request, async (slackId) => {
    let profile = await getUserProfile(slackId).catch(() => null);
    if (!profile) {
      return new Response("User profile not found.", { status: 404 });
    }
    // Make sure we do NOT include the `slackId` field nor `state` here
    const { name, skills, notificationFlags, availableInDistricts } =
      await request.json();
    await updateUserProfile(profile.id, {
      name,
      skills,
      notificationFlags,
      availableInDistricts,
    });
    return new Response("Updated", { status: 200 });
  });
}

async function withAuthenticatedUser(
  request: NextRequest,
  action: (slackId: string) => Promise<Response>
): Promise<Response> {
  const token = await getToken({ req: request });
  if (!token || !token.sub) {
    return new Response("Authentication required", { status: 401 });
  } else {
    return await action(token.sub!);
  }
}
