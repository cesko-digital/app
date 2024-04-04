import { type FieldSet } from "airtable";
import { type EventCallbacks } from "next-auth";
import { type Adapter } from "next-auth/adapters";
import {
  array,
  date,
  field,
  record,
  string,
  union,
  type DecoderFunction,
  type decodeType,
} from "typescript-json-decoder";

import { relationToZeroOrOne, takeFirst } from "~/src/decoding";

import { unwrapRecord, unwrapRecords, usersBase } from "./airtable";

//
// Decoding Helpers
//

const optionalAsNull =
  <T>(decoder: DecoderFunction<T>) =>
  (input: unknown) =>
    typeof input === "undefined" ? null : decoder(input);

const takeFirstMaybe =
  <T>(decoder: DecoderFunction<T[]>) =>
  (value: unknown) => {
    const array = decoder(value);
    return array.length > 0 ? array[0] : null;
  };

//
// Users
//

interface UserTableSchema extends FieldSet {
  id: string;
  email: string;
  emailVerified: string;
  name: string;
  slackAvatarUrl: string;
}

type User = decodeType<typeof decodeUser>;
const decodeUser = record({
  id: string,
  slackId: relationToZeroOrOne,
  email: string,
  emailVerified: optionalAsNull(date),
  name: optionalAsNull(string),
  image: field("slackAvatarUrl", relationToZeroOrOne),
});

const encodeUser = (user: Partial<User>): Partial<UserTableSchema> => ({
  email: user.email,
  emailVerified: user.emailVerified?.toISOString(),
});

const userTable = usersBase<UserTableSchema>("User Profiles");

const createUser = async (_: Pick<User, "email" | "emailVerified">) => {
  // The only way to create a user account is to register.
  // The Adapter interface still requires us to supply a `createUser`
  // function, but it should not get called.
  throw "This should not be called";
};

const getUser = async (id: string) =>
  await userTable.find(id).then(unwrapRecord).then(decodeUser);

const getUserByEmail = async (email: string) =>
  await userTable
    .select({
      view: "Confirmed Profiles",
      filterByFormula: `{email} = "${email}"`,
      maxRecords: 1,
    })
    .all()
    .then(unwrapRecords)
    .then(takeFirstMaybe(array(decodeUser)));

const getUserByAccount = async ({
  provider,
  providerAccountId,
}: {
  provider: string;
  providerAccountId: string;
}) => {
  const account = await accountTable
    .select({
      filterByFormula: `AND({provider} = "${provider}", {providerAccountId} = "${providerAccountId}")`,
      maxRecords: 1,
    })
    .all()
    .then(unwrapRecords)
    .then(takeFirstMaybe(array(decodeAccount)));
  return account ? await getUser(account.userId) : null;
};

const updateUser = async (
  user: Partial<Pick<User, "email" | "emailVerified">> & Pick<User, "id">,
) =>
  await userTable
    .update(user.id, encodeUser(user))
    .then(unwrapRecord)
    .then(decodeUser);

//
// Accounts
//

interface AccountTableSchema extends FieldSet {
  id: string;
  userId: ReadonlyArray<string>;
  providerAccountId: string;
  provider: string;
  type: string;
}

type Account = decodeType<typeof decodeAccount>;
const decodeAccount = record({
  id: string,
  userId: takeFirst(array(string)),
  providerAccountId: string,
  provider: string,
  type: union("oauth", "email", "credentials"),
});

const encodeAccount = (
  account: Partial<Account>,
): Partial<AccountTableSchema> => ({
  userId: account.userId ? [account.userId] : undefined,
  providerAccountId: account.providerAccountId,
  provider: account.provider,
  type: account.type,
});

const accountTable = usersBase<AccountTableSchema>("Accounts");

const linkAccount = async (account: Omit<Account, "id">) => {
  await accountTable.create(encodeAccount(account));
};

//
// Sessions
//

interface SessionTableSchema extends FieldSet {
  id: string;
  expires: string;
  sessionToken: string;
  userId: ReadonlyArray<string>;
}

type Session = decodeType<typeof decodeSession>;
const decodeSession = record({
  id: string,
  sessionToken: string,
  userId: takeFirst(array(string)),
  expires: date,
});

const encodeSession = (
  session: Partial<Session>,
): Partial<SessionTableSchema> => ({
  sessionToken: session.sessionToken,
  userId: session.userId ? [session.userId] : undefined,
  expires: session.expires?.toISOString(),
});

const sessionTable = usersBase<SessionTableSchema>("Sessions");

const createSession = async (
  session: Pick<Session, "sessionToken" | "userId" | "expires">,
) =>
  await sessionTable
    .create(encodeSession(session))
    .then(unwrapRecord)
    .then(decodeSession);

const getSessionBySessionToken = async (sessionToken: string) =>
  await sessionTable
    .select({
      filterByFormula: `{sessionToken} = "${sessionToken}"`,
      maxRecords: 1,
    })
    .all()
    .then(unwrapRecords)
    .then(takeFirstMaybe(array(decodeSession)));

const getSessionAndUser = async (sessionToken: string) => {
  const session = await getSessionBySessionToken(sessionToken);
  if (session) {
    const user = await getUser(session.userId);
    return { session, user };
  } else {
    return null;
  }
};

const updateSession = async (
  session: Partial<Session> & Pick<Session, "sessionToken">,
) => {
  const record = await getSessionBySessionToken(session.sessionToken);
  if (record) {
    return await sessionTable
      .update(record.id, encodeSession(session))
      .then(unwrapRecord)
      .then(decodeSession);
  } else {
    return null;
  }
};

const deleteSession = async (sessionToken: string) => {
  const session = await getSessionBySessionToken(sessionToken);
  if (session) {
    await sessionTable.destroy(session.id);
    return session;
  } else {
    return null;
  }
};

//
// Tokens
//

interface TokenTableSchema extends FieldSet {
  id: string;
  identifier: string;
  expires: string;
  token: string;
}

type Token = decodeType<typeof decodeToken>;
const decodeToken = record({
  id: string,
  identifier: string,
  expires: date,
  token: string,
});

const encodeToken = (token: Partial<Token>): Partial<TokenTableSchema> => ({
  id: token.id,
  identifier: token.identifier,
  expires: token.expires?.toISOString(),
  token: token.token,
});

const tokenTable = usersBase<TokenTableSchema>("Sign-in Tokens");

const createVerificationToken = async (token: Omit<Token, "id">) =>
  await tokenTable
    .create(encodeToken(token))
    .then(unwrapRecord)
    .then(decodeToken);

const useVerificationToken = async ({
  identifier,
  token,
}: {
  identifier: string;
  token: string;
}) => {
  // Find matching record in token table
  const record = await tokenTable
    .select({
      filterByFormula: `AND({token} = "${token}", {identifier} = "${identifier}")`,
      maxRecords: 1,
    })
    .all()
    .then(unwrapRecords)
    .then(takeFirst(array(decodeToken)));
  // If found, destroy and return
  if (record) {
    await tokenTable.destroy(record.id);
    return record;
  } else {
    return null;
  }
};

//
// Auth Logging
//

interface LogTableSchema extends FieldSet {
  id: string;
  description: string;
  eventType: string;
  timestamp: string;
  user: ReadonlyArray<string>;
  message: string;
}

type AuthLogEvent = {
  id: string;
  description: string;
  eventType: "signIn" | "signOut" | "updateUser";
  timestamp: string;
  user: string;
  message?: string;
};

const encodeAuthLogEvent = (
  event: Partial<AuthLogEvent>,
): Partial<LogTableSchema> => ({
  id: event.id,
  eventType: event.eventType,
  timestamp: event.timestamp,
  user: event.user ? [event.user] : undefined,
  message: event.message,
});

const logAuthEvent = async (
  eventType: AuthLogEvent["eventType"],
  user: string | undefined,
  message: string | undefined = undefined,
) => {
  const authLogTable = usersBase<TokenTableSchema>("Auth Log");
  await authLogTable.create(
    encodeAuthLogEvent({
      timestamp: new Date().toISOString(),
      eventType,
      message,
      user,
    }),
  );
};

/**
 * https://next-auth.js.org/configuration/events
 *
 * TBD: Log user creation?
 * TBD: Log sign-in token creation?
 */
export const authEventLoggers: Partial<EventCallbacks> = {
  signOut: ({ token }) => logAuthEvent("signOut", token.sub),
  signIn: ({ user, account }) =>
    logAuthEvent(
      "signIn",
      user.id,
      account
        ? `Account type “${account.type}”, provider “${account.provider}”.`
        : `Account unknown.`,
    ),
  updateUser: ({ user }) =>
    logAuthEvent(
      "updateUser",
      user.id,
      "This is the user verifying their e-mail address.",
    ),
};

//
// NextAuth DB Adapter
//

export const authDatabaseAdapter: Adapter = {
  createUser,
  getUser,
  getUserByEmail,
  getUserByAccount,
  updateUser,
  linkAccount,
  createSession,
  getSessionAndUser,
  updateSession,
  deleteSession,
  createVerificationToken,
  useVerificationToken,
};

export { getUserByEmail, linkAccount };
