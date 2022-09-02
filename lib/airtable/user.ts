import { decodeValidItemsFromArray, withDefault } from "lib/decoding";
import { unwrapRecords, webBase } from "./request";
import { decodeType, field, record, string } from "typescript-json-decoder";

//
// Decoding
//

/**
 * Portal User
 *
 * This is a legacy type representing the `Web::Volunteers` table, which
 * should be replaced by `Web::Teams` as soon as possible.
 */
export type PortalUser = decodeType<typeof decodePortalUser>;

/** Decode `PortalUser` from DB schema */
export const decodePortalUser = record({
  id: field("ID", string),
  name: string,
  profilePictureUrl: withDefault(
    string,
    "https://data.cesko.digital/people/generic-profile.jpg"
  ),
  email: string,
});

//
// API Calls
//

export const usersTable = webBase("Volunteers");

export async function getAllUsers(): Promise<PortalUser[]> {
  return await usersTable
    .select()
    .all()
    .then(unwrapRecords)
    .then(decodeValidItemsFromArray(decodePortalUser, "Volunteers"));
}
