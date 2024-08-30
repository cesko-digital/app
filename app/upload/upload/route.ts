import { NextResponse } from "next/server";

import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

import { withAuthenticatedUser } from "~/src/auth";
import { getUserProfile } from "~/src/data/user-profile";

export async function POST(request: Request): Promise<Response> {
  return withAuthenticatedUser(async ({ id }) => {
    // Only users with the `assetUpload` feature flag may upload
    const user = await getUserProfile(id);
    if (!user?.featureFlags.includes("assetUpload")) {
      return NextResponse.json(
        {
          error: `Feature flag 'assetUpload' not set for user '${user?.name}'.`,
        },
        { status: 403 },
      );
    }

    const body = (await request.json()) as HandleUploadBody;

    try {
      // The `handleUpload` function will generate a token for uploading the file from the client (browser).
      const jsonResponse = await handleUpload({
        body,
        request,
        onBeforeGenerateToken: async () => ({
          addRandomSuffix: false,
          allowedContentTypes: ["image/png", "image/jpeg", "application/pdf"],
        }),
        onUploadCompleted: async () => {},
      });
      return NextResponse.json(jsonResponse);
    } catch (error) {
      console.error("Error uploading blob", error);
      return NextResponse.json(
        { error: (error as Error).message },
        // The webhook will retry 5 times waiting for a 200 status code.
        { status: 400 },
      );
    }
  });
}
