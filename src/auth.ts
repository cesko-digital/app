import { type NextRequest } from "next/server";

import sendgrid from "@sendgrid/mail";
import { type NextAuthOptions } from "next-auth";
import { getToken, type JWT } from "next-auth/jwt";
import EmailProvider from "next-auth/providers/email";

import { authDatabaseAdapter, getUserByEmail } from "~/src/data/auth";
import { Route } from "~/src/routing";

/** NextAuth options used to configure various parts of the authentication machinery */
export const authOptions: NextAuthOptions = {
  adapter: authDatabaseAdapter,
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: "Česko.Digital <pomoc@cesko.digital>",
      async sendVerificationRequest({ identifier: email, url }) {
        sendgrid.setApiKey(process.env.SENDGRID_API_KEY ?? "");
        const [response] = await sendgrid.send({
          to: email,
          from: "Česko.Digital <pomoc@cesko.digital>",
          subject: "Přihlášení do aplikace Česko.Digital",
          text: url,
          trackingSettings: {
            clickTracking: {
              enable: false,
            },
          },
        });
        // TBD: Do we want to check the code?
        console.log(`Login link mailed, SendGrid response code ${response}.`);
      },
    }),
  ],
  callbacks: {
    // If user does not exist already, redirect to registration page.
    // TBD: Add a URL parameter or an intermediate screen to explain?
    async signIn({ user }) {
      if (user.email) {
        const existingUser = await getUserByEmail(user.email);
        return existingUser ? true : Route.register;
      } else {
        return Route.register;
      }
    },
    // Augment session with extra user info.
    // TBD: Can we change the default Session type to make the types click here?
    async session({ session, user }) {
      const { name, email, image, id } = user;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
      session.user = { name, email, image, id } as any;
      return session;
    },
  },
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
