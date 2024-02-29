import { type NextRequest } from "next/server";

import { type NextAuthOptions } from "next-auth";
import { getToken, type JWT } from "next-auth/jwt";
import SlackProvider from "next-auth/providers/slack";

const slackAuthProvider = SlackProvider({
  clientId: process.env.SLACK_CLIENT_ID!,
  clientSecret: process.env.SLACK_CLIENT_SECRET!,
  authorization: {
    params: {
      team: "TG21XF887",
    },
  },
});

/** NextAuth options used to configure various parts of the authentication machinery */
export const authOptions: NextAuthOptions = {
  providers: [slackAuthProvider],
};

/** Check for JWT token in request, return 401 Unauthorized if missing */
export async function withAuthenticatedUser(
  request: NextRequest,
  action: (token: JWT, slackId: string) => Promise<Response>,
): Promise<Response> {
  const token = await getToken({ req: request });
  if (!token?.sub) {
    return new Response("Authentication required", { status: 401 });
  } else {
    return await action(token, token.sub);
  }
}
