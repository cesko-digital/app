import {
  field,
  record,
  string,
  type decodeType,
} from "typescript-json-decoder";

import { decodeValidItemsFromArray, withDefault } from "~/src/decoding";

import { appBase, unwrapRecord, unwrapRecords } from "./airtable";

//
// Decoding
//

/**
 * Legacy User
 *
 * This is a legacy type representing the `App::Volunteers` table, which
 * should be replaced by `App::Teams` as soon as possible.
 */
export type LegacyUser = decodeType<typeof decodeLegacyUser>;

/** Decode `LegacyUser` from DB schema */
export const decodeLegacyUser = record({
  id: field("ID", string),
  name: string,
  profilePictureUrl: withDefault(
    string,
    "https://data.cesko.digital/people/generic-profile.jpg",
  ),
  email: string,
});

//
// API Calls
//

export const usersTable = appBase("Volunteers");

export async function getAllUsers(): Promise<LegacyUser[]> {
  return await usersTable
    .select()
    .all()
    .then(unwrapRecords)
    .then(decodeValidItemsFromArray(decodeLegacyUser, "Volunteers"));
}

export async function getUserById(id: string): Promise<LegacyUser | null> {
  return await usersTable
    .find(id)
    .then(unwrapRecord)
    .then(decodeLegacyUser)
    .catch((_) => null);
}
