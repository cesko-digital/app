import { type FieldSet } from "airtable";
import { type Adapter } from "next-auth/adapters";
import {
  array,
  date,
  record,
  string,
  union,
  type DecoderFunction,
  type decodeType,
} from "typescript-json-decoder";

import { takeFirst } from "~/src/decoding";

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
}

type User = decodeType<typeof decodeUser>;
const decodeUser = record({
  id: string,
  email: string,
  emailVerified: optionalAsNull(date),
});

const encodeUser = (user: Partial<User>): Partial<UserTableSchema> => ({
  email: user.email,
  emailVerified: user.emailVerified?.toDateString(),
});

const userTable = usersBase<UserTableSchema>("Auth: Users");

const createUser = async (user: Omit<User, "id">) =>
  await userTable.create(encodeUser(user)).then(unwrapRecord).then(decodeUser);

const getUser = async (id: string) =>
  await userTable.find(id).then(unwrapRecord).then(decodeUser);

const getUserByEmail = async (email: string) =>
  await userTable
    .select({ filterByFormula: `{email} = "${email}"`, maxRecords: 1 })
    .all()
    .then(unwrapRecords)
    .then(takeFirstMaybe(array(decodeUser)));

const getUserByAccount = async ({
  provider,
  providerAccountId,
}: {
  provider: string;
  providerAccountId: string;
}) =>
  await userTable
    .select({
      filterByFormula: `AND({provider} = "${provider}", {providerAccountId} = "${providerAccountId}")`,
      maxRecords: 1,
    })
    .all()
    .then(unwrapRecords)
    .then(takeFirstMaybe(array(decodeUser)));

const updateUser = async (user: Partial<User> & Pick<User, "id">) =>
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

const accountTable = usersBase<AccountTableSchema>("Auth: Accounts");

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
  expires: session.expires?.toDateString(),
});

const sessionTable = usersBase<SessionTableSchema>("Auth: Sessions");

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
  expires: token.expires?.toDateString(),
  token: token.token,
});

const tokenTable = usersBase<TokenTableSchema>("Auth: Tokens");

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

export { getUserByEmail };
