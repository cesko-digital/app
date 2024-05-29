import crypto from "crypto";

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

  if (!request.body) {
    return new Response("Missing payload", { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const originalFilename = searchParams.get("filename");
  if (!originalFilename) {
    return new Response("Missing filename", { status: 400 });
  }

  const data = await getArrayBufferView(request.body);
  const hash = shasumPrefix(new Uint8Array(data));
  const target = hash + "." + getFilenameExtension(originalFilename);
  const blob = await put(target, data, {
    addRandomSuffix: false,
    access: "public",
  });

  return NextResponse.json(blob);
}

const getArrayBufferView = async (data: ReadableStream<Uint8Array>) =>
  new Response(data).arrayBuffer();

const shasumPrefix = (data: crypto.BinaryLike) =>
  crypto.createHash("sha1").update(data).digest("hex").slice(0, 8);

const getFilenameExtension = (name: string) =>
  name.split(".").pop()?.toLowerCase();
