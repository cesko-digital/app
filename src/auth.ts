import sendgrid from "@sendgrid/mail";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import EmailProvider from "next-auth/providers/email";
import SlackProvider from "next-auth/providers/slack";
import { optional, record, string } from "typescript-json-decoder";

import {
  authDatabaseAdapter,
  authEventLoggers,
  getUserByEmail,
  logSignInEmailEvent,
  logUnknownEmailSignInEvent,
} from "~/src/data/auth";
import { Route } from "~/src/routing";
import { devMode, isHttpSuccessCode } from "~/src/utils";

export type OurUser = {
  id: string;
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
        await logSignInEmailEvent(email, response.statusCode);
        if (!isHttpSuccessCode(response.statusCode)) {
          console.error(
            `Got HTTP ${response.statusCode} from Sendgrid when trying to send login e-mail.`,
          );
        }
      },
    }),
  ],

  callbacks: {
    // This callback is used to control whether a user can sign in.
    // https://next-auth.js.org/configuration/callbacks#sign-in-callback
    async signIn({ user }) {
      if (user.email) {
        const existingUser = await getUserByEmail(user.email);
        // If user does not exist already, redirect back to sign-in page
        // with an error explainer and the option to register instead.
        if (!existingUser) {
          await logUnknownEmailSignInEvent(user.email);
          const params = new URLSearchParams({
            error: "UserNotFound",
            email: user.email,
          });
          return `/auth/sign-in?${params}`;
        }
        return true; // proceed
      } else {
        return Route.register();
      }
    },

    // The session callback is called whenever a session is checked.
    // https://next-auth.js.org/configuration/callbacks#session-callback
    async session({ session, token }) {
      function assertIsOurUser(
        user: DefaultSession["user"],
      ): asserts user is OurUser {
        /* If there is a user it’s always OurUser */
      }
      if (session.user) {
        assertIsOurUser(session.user);
        // Expose our user ID to the client side
        session.user.id = token.sub!;
        // If there is user image, expose that to the client, too
        if (typeof token.image === "string") {
          session.user.image = token.image;
        }
      }
      return session;
    },

    // This callback is called whenever a JSON Web Token is created (i.e. at sign in)
    // or updated (i.e whenever a session is accessed in the client).
    // https://next-auth.js.org/configuration/callbacks#jwt-callback
    async jwt({ token, session: updateContext }) {
      // The session object here is whatever was sent from the client using the `update` function.
      // Currently our only use case for updating the session is changing the profile picture.
      const decodeContext = record({
        image: optional(string),
      });
      try {
        const sessionUpdateData = decodeContext(updateContext);
        token.image = sessionUpdateData.image;
      } catch {
        /* ignoring intentionally */
      }
      return token;
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

  events: authEventLoggers,
  debug: devMode(),
};

/** Render the plain-text e-mail with the magic sign-in link */
const renderSignInEmail = (link: string) => `Ahoj!

Do aplikace Česko.Digital se můžeš přihlásit kliknutím na následující odkaz:

${link}

Odkaz má platnost 24 hodin a dá se použít jen jednou.

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
