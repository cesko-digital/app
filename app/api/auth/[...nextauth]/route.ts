import NextAuth from "next-auth";

import { authOptions } from "~/src/auth";

const handler: unknown = NextAuth(authOptions);

export { handler as GET, handler as POST };
