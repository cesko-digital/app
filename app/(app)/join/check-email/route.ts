import { NextResponse, type NextRequest } from "next/server";

import { getUserProfileByMail } from "~/src/data/user-profile";
import { looksLikeEmailAdress } from "~/src/utils";

export async function GET(request: NextRequest): Promise<Response> {
  const email = request.nextUrl.searchParams.get("email");
  if (!email || typeof email !== "string" || !looksLikeEmailAdress(email)) {
    return new Response("Required params missing or invalid.", { status: 400 });
  }
  const user = await getUserProfileByMail(email);
  return NextResponse.json({ userExists: !!user });
}
