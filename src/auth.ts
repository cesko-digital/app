import { type NextRequest } from "next/server";

import { type NextAuthOptions } from "next-auth";
import { getToken, type JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import SlackProvider from "next-auth/providers/slack";

import { devMode } from "~/src/utils";

const slackAuthProvider = SlackProvider({
  clientId: process.env.SLACK_CLIENT_ID!,
  clientSecret: process.env.SLACK_CLIENT_SECRET!,
  authorization: {
    params: {
      team: "TG21XF887",
    },
  },
});

const testingAuthProvider = CredentialsProvider({
  name: "testing password",
  credentials: {
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    const expectedPassword = process.env.TEST_SIGN_IN_PASSWORD;
    const testingUser = {
      id: "U06CB997H61",
      name: "Jan Testmatov",
      email: "zoul+testmatov@cesko.digital",
      image: "https://data.cesko.digital/people/generic-profile.jpg",
    };
    return credentials?.password === expectedPassword ? testingUser : null;
  },
});

/** NextAuth options used to configure various parts of the authentication machinery */
export const authOptions: NextAuthOptions = {
  providers: devMode()
    ? [slackAuthProvider, testingAuthProvider]
    : [slackAuthProvider],
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
