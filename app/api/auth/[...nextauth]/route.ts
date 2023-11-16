import NextAuth from "next-auth";
import SlackProvider from "next-auth/providers/slack";

const handler = NextAuth({
  providers: [
    SlackProvider({
      clientId: process.env.SLACK_CLIENT_ID as string,
      clientSecret: process.env.SLACK_CLIENT_SECRET as string,
      authorization: {
        params: {
          team: "TG21XF887",
        },
      },
    }),
  ],
});

export { handler as GET, handler as POST };
