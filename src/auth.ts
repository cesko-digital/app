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
    // OAuth flow with a Slack account, only works with the Česko.Digital workspace.
    SlackProvider({
      clientId: process.env.SLACK_CLIENT_ID!,
      clientSecret: process.env.SLACK_CLIENT_SECRET!,
      authorization: {
        params: {
          team: "TG21XF887",
        },
      },
    }),
    // E-mail flow, the e-mail has to already exist in our DB
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: "Česko.Digital <pomoc@cesko.digital>",
      async sendVerificationRequest({ identifier: email, url }) {
        sendgrid.setApiKey(process.env.SENDGRID_API_KEY ?? "");
        const [response] = await sendgrid.send({
          to: email,
          from: "Česko.Digital <pomoc@cesko.digital>",
          subject: "Přihlášení do aplikace Česko.Digital",
          text: renderSignInEmail(url),
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
    async signIn({ user }) {
      if (user.email) {
        const existingUser = await getUserByEmail(user.email);
        // If user does not exist already, redirect back to sign-in page
        // with an error explainer and the option to register instead.
        if (!existingUser) {
          return `/auth/sign-in?error=UserNotFound&email=${user.email}`;
        }
        return true; // proceed
      } else {
        return Route.register;
      }
    },

    // This is called when the JWT token is created or updated. We use
    // the callback to store the Slack ID in the token so that it is available
    // in the session data on the client. TBD: This is a legacy hack, we
    // should replace the Slack ID with the regular database ID of the user.
    async jwt({ token, user }) {
      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.slackId = (user as any as OurUser).slackId;
      }
      return token;
    },

    // Forward Slack ID from the token to the session object to be used on the client.
    // TBD: Legacy hack, see note above.
    async session({ session, token }) {
      if (session.user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any as OurUser).slackId = token.slackId as string;
      }
      return session;
    },
  },

  session: {
    // Use session tokens to store sessions. We tried using DB sessions, but
    // the session is queried very often and the performance was horrible.
    strategy: "jwt",
  },

  // Use our custom UI for sign-in screens
  pages: {
    signIn: "/auth/sign-in",
    verifyRequest: "/auth/sent",
    error: "/auth/error",
  },

  debug: true,
};

/** Render the plain-text e-mail with the magic sign-in link */
const renderSignInEmail = (link: string) => `Ahoj!

Do aplikace Česko.Digital se můžeš přihlásit kliknutím na následující odkaz:

${link}

Tenhle mail ti přišel, protože se chce někdo přihlásit do aplikace Česko.Digital
s tvou e-mailovou adresou. Pokud to nejsi ty, můžeš tenhle mail v klidu ignorovat.
V případě dotazů nebo potíží prostě odepiš na tenhle mail, ozveme se. Díky,

Česko.Digital`;

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
