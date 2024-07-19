import { NextResponse, type NextRequest } from "next/server";

import {
  array,
  optional,
  record,
  string,
  union,
} from "typescript-json-decoder";

import { withAuthenticatedUser } from "~/src/auth";
import { logUserCreatedEvent } from "~/src/data/auth";
import {
  createUserProfile,
  getUserProfile,
  getUserProfileByMail,
  privacyFlags,
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
    bio: optional(string),
    organizationName: optional(string),
    profileUrl: optional(string),
    privacyFlags: array(union(...privacyFlags)),
  });
  try {
    const payload = decodeRequest(await request.json());
    const email = normalizeEmailAddress(payload.email);
    const previousProfile = await getUserProfileByMail(email);
    if (previousProfile) {
      const msg = "Email already exists";
      console.error(msg);
      return new Response(msg, { status: 401 });
    } else {
      const user = await createUserProfile({
        ...payload,
        email,
        state: "unconfirmed",
        slackUserRelationId: undefined,
        createdAt: new Date().toISOString(),
        featureFlags: ["registrationV2"],
      });
      await logUserCreatedEvent(user);
      return new Response("User profile created.", { status: 201 });
    }
  } catch (e) {
    console.error(e);
    return new Response("Sorry :(", { status: 500 });
  }
}

/** Get user profile, used for stuff like displaying user preferences */
export async function GET() {
  return withAuthenticatedUser(async (user) => {
    const profile = await getUserProfile(user.id);
    return profile
      ? NextResponse.json(profile)
      : new Response("User profile not found.", { status: 404 });
  });
}

/** Change user profile, used for stuff like updating user preferences */
export async function PATCH(request: NextRequest) {
  return withAuthenticatedUser(async (user) => {
    const profile = await getUserProfile(user.id);
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
      contactEmail,
      availableInDistricts,
      bio,
    } = await request.json();
    await updateUserProfile(profile.id, {
      name,
      skills,
      notificationFlags,
      privacyFlags,
      contactEmail,
      availableInDistricts,
      bio,
    });
    return new Response("Updated", { status: 200 });
  });
}
