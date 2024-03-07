import sendgrid from "@sendgrid/mail";
import { getServerSession, type NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import SlackProvider from "next-auth/providers/slack";

import { authDatabaseAdapter, getUserByEmail } from "~/src/data/auth";
import { Route } from "~/src/routing";

export type OurUser = {
  id: string;
  slackId: string;
  name: string;
  email: string;
  image: string;
};

/** NextAuth options used to configure various parts of the authentication machinery */
export const authOptions: NextAuthOptions = {
  adapter: authDatabaseAdapter,
  providers: [
    SlackProvider({
      clientId: process.env.SLACK_CLIENT_ID!,
      clientSecret: process.env.SLACK_CLIENT_SECRET!,
      authorization: {
        params: {
          team: "TG21XF887",
        },
      },
    }),
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
    // Augment session with extra user info. We could augment the `Session`
    // type to make the types match better both here and elsewhere, but in
    // practice this turned out to be pain, so we just force-cast the values.
    async session({ session, user }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { name, email, image, id, slackId } = user as any as OurUser;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
      session.user = { name, email, image, id, slackId } as any;
      return session;
    },
  },
};

/** If there is an active session, run action with session user, otherwise return 401 / Unauthorized */
export async function withAuthenticatedUser(
  action: (user: OurUser) => Promise<Response>,
): Promise<Response> {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ourUser = session.user as any as OurUser;
    return action(ourUser);
  } else {
    return new Response("Authentication required", { status: 401 });
  }
}
