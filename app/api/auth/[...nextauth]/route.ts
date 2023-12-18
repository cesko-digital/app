import NextAuth from "next-auth";

import { authOptions } from "~/src/utils";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
