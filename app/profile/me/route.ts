import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getSlackUserBySlackId } from "lib/airtable/slack-user";
import {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
} from "lib/airtable/user-profile";

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

export async function PATCH(request: NextRequest) {
  return withAuthenticatedUser(request, async (slackId) => {
    let profile = await getUserProfile(slackId).catch(() => null);
    if (!profile) {
      return new Response("User profile not found.", { status: 404 });
    }
    // Make sure we do NOT include the `slackId` field nor `state` here
    const { name, skills, notificationFlags } = await request.json();
    await updateUserProfile(profile.id, {
      name,
      skills,
      notificationFlags,
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
