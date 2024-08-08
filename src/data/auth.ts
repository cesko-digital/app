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

import { type UserProfile } from "~/src/data/user-profile";
import { relationToZeroOrOne, takeFirst } from "~/src/decoding";
import { normalizeEmailAddress } from "~/src/utils";

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
  state: string;
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
  // Automatically mark user as confirmed when e-mail has been verified
  state: user.emailVerified ? "confirmed" : undefined,
});

const userTable = usersBase<UserTableSchema>("User Profiles");

const getUser = async (id: string) =>
  await userTable.find(id).then(unwrapRecord).then(decodeUser);

/**
 * Get user by registration e-mail
 *
 * This is intentionally NOT limited to confirmed users.
 *
 * The e-mail is normalized before querying the DB.
 */
const getUserByEmail = async (email: string) =>
  await userTable
    .select({
      filterByFormula: `{email} = "${normalizeEmailAddress(email)}"`,
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
  const matchingRecords = await tokenTable
    .select({
      filterByFormula: `AND({token} = "${token}", {identifier} = "${identifier}")`,
      maxRecords: 1,
    })
    .all()
    .then(unwrapRecords);

  // Maybe the token expired and was deleted in the meantime?
  if (matchingRecords.length === 0) {
    return null;
  }

  // No, we have the token, destroy it and return
  const [record] = matchingRecords.map(decodeToken);
  await tokenTable.destroy(record.id);
  return record;
};

//
// Auth Logging
//

interface LogTableSchema extends FieldSet {
  id: string;
  description: string;
  eventType: string;
  environment: string;
  timestamp: string;
  user: ReadonlyArray<string>;
  message: string;
}

type AuthLogEvent = {
  id: string;
  description: string;
  eventType:
    | "signIn" // User has signed in successfully
    | "signOut" // User has signed out successfully
    | "updateUser" // User was updated, currently only used for `emailVerified` timestamp updates
    | "sendSignInLink" // Sign-in link was requested, successfully or not
    | "unknownEmailSignIn" // User attempted to sign in with an unknown e-mail address
    | "userCreated"; // New user account was created
  environment?: "development" | "production" | "test";
  timestamp: string;
  user: string;
  message?: string;
};

const encodeAuthLogEvent = (
  event: Partial<AuthLogEvent>,
): Partial<LogTableSchema> => ({
  id: event.id,
  eventType: event.eventType,
  environment: event.environment,
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
      environment: process.env.NODE_ENV,
      eventType,
      message,
      user,
    }),
  );
};

export const logSignInEmailEvent = async (
  email: string,
  mailerStatusCode: number | undefined = undefined,
) => {
  const user = await getUserByEmail(email);
  await logAuthEvent(
    "sendSignInLink",
    user?.id,
    `E-mail “${email}”, mailer status code ${mailerStatusCode ?? "unknown"}.`,
  );
};

export const logUnknownEmailSignInEvent = async (email: string) =>
  logAuthEvent("unknownEmailSignIn", undefined, `E-mail “${email}”.`);

export const logUserCreatedEvent = async (user: Pick<UserProfile, "id">) =>
  logAuthEvent("userCreated", user.id);

/**
 * https://next-auth.js.org/configuration/events
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

const notImplemented = () => {
  throw new Error("Not implemented");
};

export const authDatabaseAdapter: Adapter = {
  getUser,
  getUserByEmail,
  getUserByAccount,
  updateUser,
  linkAccount,
  createVerificationToken,
  useVerificationToken,
  // The following callbacks are not needed for our use cases
  // and it should be safe to keep them unimplemented.
  createUser: notImplemented,
  createSession: notImplemented,
  getSessionAndUser: notImplemented,
  updateSession: notImplemented,
  deleteSession: notImplemented,
};

export { getUserByEmail, linkAccount };
