import NextAuth from "next-auth";
import SlackProvider from "next-auth/providers/slack";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const handler = NextAuth({
  providers: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    SlackProvider({
      clientId: process.env.SLACK_CLIENT_ID!,
      clientSecret: process.env.SLACK_CLIENT_SECRET!,
      authorization: {
        params: {
          team: "TG21XF887",
        },
      },
    }),
  ],
});

export { handler as GET, handler as POST };
