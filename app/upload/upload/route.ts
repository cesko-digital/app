import { NextResponse } from "next/server";

import { put } from "@vercel/blob";

export async function POST(request: Request): Promise<Response> {
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
