import { FieldSet } from "airtable";
import { unwrapRecord, unwrapRecords, webBase } from "./request";
import { decodeUserProfile, Schema as UserProfileSchema } from "./user-profile";
import { relationToZeroOrOne } from "lib/decoding";
import {
  array,
  decodeType,
  optional,
  record,
  string,
  union,
} from "typescript-json-decoder";

const marketPlaceTable = webBase<Schema>("Market Place");
const userProfileTable = webBase<UserProfileSchema>("User Profiles");

/** The schema of the Market Place table in Airtable */
export interface Schema extends FieldSet {
  id: string;
  owner: ReadonlyArray<string>;
  slackThreadUrl: string;
  state: string;
  text: string;
}

/** A market-place offer */
export type MarketPlaceOffer = decodeType<typeof decodeMarketPlaceOffer>;
export const decodeMarketPlaceOffer = record({
  id: string,
  owner: relationToZeroOrOne,
  ownerName: relationToZeroOrOne,
  ownerEmail: relationToZeroOrOne,
  ownerAvatarUrl: relationToZeroOrOne,
  ownerSlackId: relationToZeroOrOne,
  ownerContactEmail: relationToZeroOrOne,
  contactEmail: optional(string),
  slackThreadUrl: string,
  originalMessageTimestamp: string,
  title: optional(string),
  text: string,
  createdAt: string,
  publishedAt: optional(string),
  lastModifiedAt: string,
  state: union(
    "new",
    "published",
    "invalid",
    "expired",
    "cancelled",
    "completed"
  ),
});

//
// API Calls
//

/** Returna a single market-place offer identified by its database ID */
export async function getMarketPlaceOffer(
  id: string
): Promise<MarketPlaceOffer> {
  return await marketPlaceTable
    .find(id)
    .then(unwrapRecord)
    .then(decodeMarketPlaceOffer);
}

/** Return all market-place offers */
export async function getAllMarketPlaceOffers(): Promise<MarketPlaceOffer[]> {
  return await marketPlaceTable
    .select()
    .all()
    .then(unwrapRecords)
    .then(array(decodeMarketPlaceOffer));
}

/** Return all published market-place offers */
export async function getPublishedMarketPlaceOffers(): Promise<
  MarketPlaceOffer[]
> {
  return await marketPlaceTable
    .select({ view: "Published Offers", maxRecords: 1000 })
    .all()
    .then(unwrapRecords)
    .then(array(decodeMarketPlaceOffer));
}

/** Insert new market-place offer */
export async function insertNewMarketPlaceOffer(
  offer: Pick<
    MarketPlaceOffer,
    "state" | "text" | "owner" | "slackThreadUrl" | "originalMessageTimestamp"
  >
): Promise<MarketPlaceOffer> {
  const { state, text, owner, slackThreadUrl, originalMessageTimestamp } =
    offer;

  // First find the matching owner profile in (synced) User Profiles
  const ownerProfile = await userProfileTable
    .select({
      filterByFormula: `{slackId} = "${owner}"`,
      maxRecords: 1,
    })
    .all()
    // This is a sorry hack. We need the owner record’s database ID to
    // create a relation from Market Place table to the User Profiles table,
    // _but_ the ID returned by the RECORD_ID() formula in User Profiles
    // reports a “wrong” ID from the original, synced User Profiles table.
    // So we need to extract the correct ID here.
    .then((records) => ({ ...records[0].fields, id: records[0].id }))
    .then((x) => decodeUserProfile(x as any));

  // Then insert the new offer
  return await marketPlaceTable
    .create({
      state,
      text,
      slackThreadUrl,
      originalMessageTimestamp,
      owner: [ownerProfile.id],
      contactEmail: ownerProfile.contactEmail ?? ownerProfile.email,
    })
    .then(unwrapRecord)
    .then(decodeMarketPlaceOffer);
}

/** Update existing market-place offer */
export async function updateMarketPlaceOffer(
  recordId: string,
  data: Partial<Pick<MarketPlaceOffer, "state">>
): Promise<MarketPlaceOffer> {
  return await marketPlaceTable
    .update(recordId, data)
    .then(unwrapRecord)
    .then(decodeMarketPlaceOffer);
}

//
// Helpers
//

/** Compare offers by time of creation, first created gets first */
export const compareOffersByTime = (a: MarketPlaceOffer, b: MarketPlaceOffer) =>
  Date.parse(a.createdAt) - Date.parse(b.createdAt);
