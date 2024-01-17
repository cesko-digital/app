import { NextResponse, type NextRequest } from "next/server";

import { optional, record, string } from "typescript-json-decoder";

import { withAuthenticatedUser } from "~/src/auth";
import { getSlackUserBySlackId } from "~/src/data/slack-user";
import {
  createUserProfile,
  getUserProfile,
  getUserProfileByMail,
  updateUserProfile,
} from "~/src/data/user-profile";
import { normalizeEmailAddress } from "~/src/utils";

/** Create new user profile (called by the onboarding form) */
export async function POST(request: NextRequest): Promise<Response> {
  const decodeRequest = record({
    name: string,
    email: string,
    skills: string,
    gdprPolicyAcceptedAt: string,
    codeOfConductAcceptedAt: string,
    occupation: optional(string),
    availableInDistricts: optional(string),
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
  return withAuthenticatedUser(request, async (_, slackId) => {
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
        availableInDistricts: "",
        state: "confirmed",
        slackUserRelationId: slackUser.id,
        createdAt: new Date().toISOString(),
        gdprPolicyAcceptedAt: undefined,
        codeOfConductAcceptedAt: undefined,
      });
    }
    return NextResponse.json(profile);
  });
}

/** Change user profile, used for stuff like updating user preferences */
export async function PATCH(request: NextRequest) {
  return withAuthenticatedUser(request, async (_, slackId) => {
    const profile = await getUserProfile(slackId).catch(() => null);
    if (!profile) {
      return new Response("User profile not found.", { status: 404 });
    }
    // Make sure we do NOT include the `slackId` field nor `state` here
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const {
      name,
      skills,
      notificationFlags,
      privacyFlags,
      availableInDistricts,
    } = await request.json();
    await updateUserProfile(profile.id, {
      name,
      skills,
      notificationFlags,
      privacyFlags,
      availableInDistricts,
    });
    /* eslint-enable @typescript-eslint/no-unsafe-assignment */
    return new Response("Updated", { status: 200 });
  });
}
