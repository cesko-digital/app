import { NextResponse } from "next/server";

import { put } from "@vercel/blob";
import { getServerSession } from "next-auth";

import { authOptions, type OurUser } from "~/src/auth";
import { getUserProfile } from "~/src/data/user-profile";

export async function POST(request: Request): Promise<Response> {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await getUserProfile((session.user as OurUser).id);
  if (!user?.featureFlags.includes("assetUpload")) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(request.url);

  const filename = searchParams.get("filename");
  if (!filename) {
    return new Response("Missing filename", { status: 400 });
  }

  if (!request.body) {
    return new Response("Missing payload", { status: 400 });
  }

  const blob = await put(filename, request.body, {
    access: "public",
  });

  return NextResponse.json(blob);
}
