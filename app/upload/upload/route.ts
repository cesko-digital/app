import crypto from "crypto";

import { NextResponse } from "next/server";

import { put } from "@vercel/blob";

import { withAuthenticatedUser } from "~/src/auth";
import { getUserProfile } from "~/src/data/user-profile";

export async function POST(request: Request): Promise<Response> {
  return withAuthenticatedUser(async ({ id }) => {
    // Only users with the `assetUpload` feature flag may upload
    const user = await getUserProfile(id);
    if (!user?.featureFlags.includes("assetUpload")) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!request.body) {
      return new Response("Missing payload", { status: 400 });
    }

    // We use the original filename to get the extension
    const { searchParams } = new URL(request.url);
    const originalFilename = searchParams.get("filename");
    if (!originalFilename) {
      return new Response("Missing filename", { status: 400 });
    }

    // But the file name itself is an 8-character prefix of the SHA1
    // of file content
    const data = await getArrayBufferView(request.body);
    const hash = shasumPrefix(new Uint8Array(data));
    const target = hash + "." + getFilenameExtension(originalFilename);

    // Upload
    const blob = await put(target, data, {
      addRandomSuffix: false,
      access: "public",
    });

    return NextResponse.json(blob);
  });
}

const getArrayBufferView = async (data: ReadableStream<Uint8Array>) =>
  new Response(data).arrayBuffer();

const shasumPrefix = (data: crypto.BinaryLike) =>
  crypto.createHash("sha1").update(data).digest("hex").slice(0, 8);

const getFilenameExtension = (name: string) =>
  name.split(".").pop()?.toLowerCase();
