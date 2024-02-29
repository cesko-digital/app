import { type NextRequest } from "next/server";

import sendgrid from "@sendgrid/mail";
import { type NextAuthOptions } from "next-auth";
import { getToken, type JWT } from "next-auth/jwt";
import EmailProvider from "next-auth/providers/email";
import SlackProvider from "next-auth/providers/slack";

import { authDatabaseAdapter } from "~/src/data/auth";

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
