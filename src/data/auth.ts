import { type FieldSet } from "airtable";
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
  emailVerified: user.emailVerified?.toDateString(),
  // Automatically mark user as confirmed when e-mail has been verified
  state: user.emailVerified ? "confirmed" : undefined,
});

const userTable = usersBase<UserTableSchema>("User Profiles");

const getUser = async (id: string) =>
  await userTable.find(id).then(unwrapRecord).then(decodeUser);

/**
 * Get user by registration e-mail
 *
 * Note that this is intentionally NOT limited to confirmed users.
 */
const getUserByEmail = async (email: string) =>
  await userTable
    .select({
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
// NextAuth DB Adapter
//

const notImplemented = () => {
  throw "Not implemented";
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
